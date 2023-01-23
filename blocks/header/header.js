import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';
import { wrapImgsInLinks } from '../../scripts/scripts.js';

// media query match that indicates mobile/tablet width
const MQ = window.matchMedia('(min-width: 800px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const header = document.getElementsByTagName('header');
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && MQ.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!MQ.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(header, nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(header, nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || MQ.matches) ? '' : 'hidden';
  header.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, false);
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (MQ.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || MQ.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

function handleClick() {
  const expanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', !expanded);
}

function handleMouseEnter() {
  this.setAttribute('aria-expanded', true);
}

function handleMouseLeave() {
  this.setAttribute('aria-expanded', false);
}

function changeDropdownBehavior(navSection, isDesktop = false) {
  if (isDesktop) {
    navSection.removeEventListener('click', handleClick);
    navSection.addEventListener('mouseenter', handleMouseEnter);
    navSection.addEventListener('mouseleave', handleMouseLeave);
  } else {
    navSection.addEventListener('click', handleClick);
    navSection.removeEventListener('mouseenter', handleMouseEnter);
    navSection.removeEventListener('mouseleave', handleMouseLeave);
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const config = readBlockConfig(block);
  block.textContent = '';

  const header = document.querySelector('header');

  // fetch nav content
  const navPath = config.nav || '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    nav.innerHTML = html;

    const classes = ['brand', 'sections', 'tools'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });

    const pathName = window.location.pathname;

    const navSections = nav.querySelector('.nav-sections');
    const navDropdowns = [];

    if (navSections) {
      navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {

        // adds current css class to the current page in the navbar
        const navLink = navSection.querySelector(':scope > a');
        if (navLink) {
          const href = navLink.getAttribute('href');
          if (href === pathName) {
            navSection.classList.add('active');
          }
        }
      });

      Array.from(navSections.querySelectorAll(':scope > ul > li'))
        .filter((navSection) => navSection.querySelector('ul'))
        .forEach((navSection) => {
          navSection.classList.add('nav-drop');
          changeDropdownBehavior(navSection, MQ.matches);

          navDropdowns.push(navSection);
        });
    }

    // hamburger for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('nav-hamburger');
    hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>`;
    hamburger.addEventListener('click', () => toggleMenu(header, nav, navSections));
    nav.append(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    // prevent mobile nav behavior on window resize
    toggleMenu(header, nav, navSections, MQ.matches);
    MQ.addEventListener('change', () => {
      toggleMenu(header, nav, navSections, MQ.matches);
      console.log('here');
      navDropdowns.forEach((navSection) => changeDropdownBehavior(navSection, MQ.matches));
    });

    wrapImgsInLinks(nav);
    decorateIcons(nav);
    block.append(nav);

    const debounce = (fn) => {
      let frame;
      return (...params) => {
        if (frame) {
          cancelAnimationFrame(frame);
        }
        frame = requestAnimationFrame(() => {
          fn(...params);
        });
      };
    };

    // adds scroll position to html tag
    // see. https://css-tricks.com/styling-based-on-scroll-position/
    const storeScroll = () => {
      document.documentElement.dataset.topposition = window.scrollY === 0;
    };

    document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    storeScroll();
  }
}
