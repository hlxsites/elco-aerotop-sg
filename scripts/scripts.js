import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'elco-aerotop-sg'; // add your RUM generation information here

const SUPPORTED_LANGUAGES = ['de', 'en', 'fr', 'it'];
const DEFAULT_LANGUAGE = 'de';

function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * Wraps images followed by links within a matching <a> tag.
 * @param {Element} container The container element
 */
export function wrapImgsInLinks(container) {
  const pictures = container.querySelectorAll('p picture');
  pictures.forEach((pic) => {
    const parent = pic.parentNode;
    const link = parent.nextElementSibling.querySelector('a');
    if (link && link.textContent.includes(link.getAttribute('href'))) {
      link.parentElement.remove();
      link.innerHTML = pic.outerHTML;
      parent.replaceWith(link);
    }
  });
}


function buildProgressBar(main) {
  var elements = main.querySelectorAll('.progressbartable div div');
  var sizel = elements.length;
  var title;
  var description;
  var size;
  var units;
  var subtitle;
  //var number 
  //var subelements = elements.querySelector('div div');
  for (var i = 0; i < (sizel / 5); i++) {
    var j = 0;
    elements.forEach((element, index) => {
      if (index >= i * 5 && index < (i + 1) * 5) {
        if (j == 0) {
          title = element.textContent;
        }
        else if (j == 1) {
          description = element.textContent;
        }
        else if (j == 2) {
          size = element.textContent;
        }
        else if (j == 3) {
          units = element.textContent;
        }
        else if (j == 4) {
          subtitle = element.textContent;
        }
        j++;
        var p2 = document.createElement('p');
        p2.innerHTML = element.textContent;
        console.log("el p2+k2 es " + p2.innerHTML);


        //progresstable.append(p2);
      }

    });

    var progresstable = document.getElementsByClassName('progressbartable')[i];
    const mainTable = document.createElement('div');
    const progressTitle=document.createElement('h3');
    const progressAside1=document.createElement('aside');
    const progressAside2=document.createElement('aside');
    const progressSubtitle=document.createElement('div');
    mainTable.classList.add('progress-wrapper');
    progressTitle.classList.add('progress-title');
    progressAside1.classList.add('progress-aside-1');
    progressAside2.classList.add('progress-aside-2');
    progressAside1.classList.add('aside');
    progressAside2.classList.add('aside');
    progressSubtitle.classList.add('progress-subtitle');
    mainTable.appendChild(progressTitle);
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.progress-value'+i+' { animation: load'+i+' 3s normal forwards; box-shadow: 0 10px 40px -10px #fff; border-radius: 100px; background: blue; height: 30px; width: 0;}';
    document.getElementsByTagName('head')[0].appendChild(style);
    var style2 = document.createElement('style');
    style2.type = 'text/css';
    style2.innerHTML = '@keyframes load'+i+' { 0% { width: 0; } 100% { width: '+size+'%; }}';
    console.log(style2.innerHTML);
    document.getElementsByTagName('head')[0].appendChild(style2);


    const progress1 = document.createElement('div');
    progress1.classList.add('progress');
    const progress2 = document.createElement('div');
    progress2.classList.add('progress-value'+i);
    progress1.appendChild(progress2);
    //progress1.innerHTML = '<div class="progress-value"></div>';
    //progressAside1.innerHTML = '<div class="progress"> <div class="progress-value"></div>';
    progressAside1.appendChild(progress1);
    console.log(progress1);
    console.log(progressAside1);
    mainTable.appendChild(progressAside1);
    mainTable.appendChild(progressAside2);
    mainTable.appendChild(progressSubtitle);
    progressTitle.textContent=title;
    //progressAside1.textContent=title;
    progressAside2.textContent=size+" "+units;
    progressSubtitle.textContent=subtitle;
    progresstable.prepend(mainTable);

    /** const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.innerHTML = '<div class="progress-value"></div>';
    progresstable.prepend(progress); */


    //div.prepend(header);

  }
  console.log(elements);
/**

  elements.forEach((div) => {
    const p=document.createElement('p');
    p.innerText=div.innerText;
    console.log("this is "+div.textContent);
    div.prepend(p);
  var second=div.c000000;
  console.log("second is"+second.innerText);

  const p1=document.createElement('p');
    p1.innerText=second.innerText;
    console.log("this is "+p1.textContent);

  var elementsDiv=div.children;  
  console.log(elementsDiv);

  console.log('second '+second);
  var arraydiv = Array.prototype.slice.call( elementsDiv )
  var elementNumber=0;
  const firstdiv=arraydiv[0].children;
  for (let i = 0; i < firstdiv.length; i++) {
    console.log(i+firstdiv[i]);
}
  arraydiv.forEach((div) => {
    console.log(div);
    for (let i = 0; i < div.length; i++) {
      console.log(div[1].textContent)
      header.innerHTML=div[0].innerHTML;
  }
  });
    //div.setAttribute('hidden','');
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.innerHTML = '<div class="progress-value"></div>';
    div.prepend(progress);
    //div.prepend(header);
    
  }); */
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  buildProgressBar(main);
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  const preferredLanguage = navigator.languages.find(
    (l) => SUPPORTED_LANGUAGES.includes(l),
  ) || DEFAULT_LANGUAGE;
  if (window.location.pathname === '/' && window.location.origin.match(/\.hlx\.(page|live)$/)) {
    window.location.replace(`/${preferredLanguage}/`);
  }

  const [, lang] = window.location.pathname.split('/');
  document.documentElement.lang = lang;

  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? main.querySelector(hash) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'), [['nav', `/${document.documentElement.lang}/nav`]]);
  loadFooter(doc.querySelector('footer'), [['footer', `/${document.documentElement.lang}/footer`]]);

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.svg`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
