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

function addDynamic3(element,itemnumber,callback) {
  var options = {
    root: document.documentElement,
  };
  console.log ('element is '+element);
  console.log ('item number is '+ itemnumber);
  console.log('callback is '+callback);
  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      callback(itemnumber);
    });
  }, options);

  observer.observe(element);
}

function callback(itemNumber) {

  const progresstable = document.getElementsByClassName('progressbartable')[itemNumber];
  console.log ('progresstable is '+progresstable);
  console.log ('item number is '+ itemNumber);
  const elementToChange = progresstable.getElementsByClassName('progress-aside-1')
  elementToChange.classList.add('progress-value' + itemNumber);
  elementToChange.classList.remove('hidden');
}

function buildProgressBarTable(main) {
  const elements = main.querySelectorAll('.progress-bar-table > div');
  const sizel = elements.length;
  console.log ('size is '+sizel);
  console.log(elements);
  let title;
  let description;
  let size;
  let units;
  let subtitle;
  let comparateValues=calculateRatio(elements);
  console.log(comparateValues);
  for (let i = 0; i < sizel ; i++) {
  if (i !==0){ 
  elements[i].classList.add('progress-wrapper');   
  let childNodes=elements[i].childNodes; 
  console.log(childNodes.length);
  console.log(childNodes[0]);
  console.log(childNodes[1]);
  childNodes[1].classList.add('progress-title');
  console.log(childNodes[2]);
  console.log(childNodes[3]);
  childNodes[3].classList.add('progress-description');
  let ratio=childNodes[5].textContent;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.progress-value' + i + ' { animation: load' + i + ' 3s normal forwards; box-shadow: 0 10px 40px -10px #fff; border-radius: 100px; background: blue; height: 30px; width: 0;}';
  document.getElementsByTagName('head')[0].appendChild(style);
  const style2 = document.createElement('style');
  style2.type = 'text/css';
  style2.innerHTML = '@keyframes load' + i + ' { 0% { width: 0; } 100% { width: ' + comparateValues[i-1] + '%; }}';
  document.getElementsByTagName('head')[0].appendChild(style2);
  console.log(childNodes[4]);
  console.log(childNodes[5]);
  childNodes[5].textContent='';
  childNodes[5].classList.add('progress');
  childNodes[5].classList.add('progress-aside-1');
  childNodes[5].classList.add('aside');
  const progress2 = document.createElement('div');
  progress2.classList.add('progress-value' + i);
  childNodes[5].appendChild(progress2);
  console.log(childNodes[6]);
  console.log(childNodes[7]);
  childNodes[7].classList.add('progress');
  childNodes[7].classList.add('progress-aside-2');
  childNodes[7].classList.add('aside');
  childNodes[7].textContent=ratio+' '+childNodes[7].textContent;
  console.log(childNodes[8]);
  console.log(childNodes[9]);
  childNodes[9].classList.add('progress-subtitle');
  console.log(childNodes[10]);

      } else {
        elements[0].style.display = 'none';
      }
  }
}

function calculateRatio (elements){

  const sizel = elements.length;
  console.log ('size is '+sizel);
  console.log(elements);
let ratio1;
let ratio2;
  if (sizel==2)
  {
    return[100,0];
  } else {

    let childNodes1=elements[1].childNodes; 
    let childNodes2=elements[2].childNodes; 
    ratio1= parseInt(childNodes1[5].textContent);
    ratio2= parseInt(childNodes2[5].textContent);
    if (ratio2 > ratio1) { 
      ratio1=Math.floor(ratio1*100/ratio2);
      ratio2=100;
    }else {
      ratio2=Math.floor(ratio2*100/ratio1);
      ratio1=100;
    }
    return [ratio1,ratio2];
  }

  
  

}


function buildProgressBar(main) {
  const elements = main.querySelectorAll('.progressbartable div div');
  const sizel = elements.length;
  let title;
  let description;
  let size;
  let units;
  let subtitle;
  for (let i = 0; i < (sizel / 5); i++) {
    let j = 0;
    elements.forEach((element, index) => {
      if (index >= i * 5 && index < (i + 1) * 5) {
        if (j === 0) {
          title = element.textContent;
        } else if (j === 1) {
          description = element.textContent;
        } else if (j === 2) {
          size = element.textContent;
        } else if (j === 3) {
          units = element.textContent;
        } else if (j === 4) {
          subtitle = element.textContent;
        }
        j++;
        const p2 = document.createElement('p');
        p2.innerHTML = element.textContent;
        element.style.display = 'none';
      }
    });

    const progresstable = document.getElementsByClassName('progressbartable')[i];
    const mainTable = document.createElement('div');
    const progressTitle = document.createElement('h3');
    const progressDescription = document.createElement('p');
    const progressAside1 = document.createElement('aside');
    const progressAside2 = document.createElement('aside');
    const progressSubtitle = document.createElement('div');
    mainTable.classList.add('progress-wrapper');
    progressTitle.classList.add('progress-title');
    progressDescription.classList.add('progress-description');
    progressAside1.classList.add('progress-aside-1');
    progressAside2.classList.add('progress-aside-2');
    progressAside1.classList.add('aside');
    progressAside2.classList.add('aside');
    progressSubtitle.classList.add('progress-subtitle');
    mainTable.appendChild(progressTitle);
    mainTable.appendChild(progressDescription);
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.progress-value' + i + ' { animation: load' + i + ' 3s normal forwards; box-shadow: 0 10px 40px -10px #fff; border-radius: 100px; background: blue; height: 30px; width: 0;}';
    document.getElementsByTagName('head')[0].appendChild(style);
    const style2 = document.createElement('style');
    style2.type = 'text/css';
    style2.innerHTML = '@keyframes load' + i + ' { 0% { width: 0; } 100% { width: ' + size + '%; }}';
    document.getElementsByTagName('head')[0].appendChild(style2);
    const progress1 = document.createElement('div');
    progress1.classList.add('progress');
    const progress2 = document.createElement('div');
    //progress2.classList.add('hidden');
    progress2.classList.add('progress-value' + i);
    progress1.appendChild(progress2);
    progressAside1.appendChild(progress1);
    mainTable.appendChild(progressAside1);
    mainTable.appendChild(progressAside2);
    if (subtitle !== '') {
      mainTable.appendChild(progressSubtitle);
    } progressTitle.textContent = title;
    progressDescription.textContent = description;
    progressAside2.textContent = size + ' ' + units;
    if (subtitle !== '') {
      progressSubtitle.textContent = subtitle;
    } progresstable.prepend(mainTable);
    console.log ('progresstable is '+progresstable);
    console.log ('item number is '+ i);
    console.log('callback is '+callback);
    addDynamic3(progresstable,i,callback); 
    // const elementsTohide = main.querySelectorAll('.progressbartable .block');
  }
  // console.log(elements);
}

function addDynamic2(main) {
  elements = main.querySelectorAll('.hidden');
  for (let i = 0; i < elements.length; i++) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.classList.add('progress-value' + i);
        element.classList.remove('hidden');
        obs.disconnect();
      }
    });
  });
  obs.observe(elements[i]);
}
}



function addDynamic(main) {
  let elements;
  let windowHeight;
  let first = 0;

  function init() {
    elements = main.querySelectorAll('.hidden');
    // console.log(elements);
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const positionFromTop = elements[i].getBoundingClientRect().top;
      // console.log('elements is ' + elements.length)

      if ((positionFromTop - windowHeight) <= 0) {
        if (first > elements.length) {
          // alert(positionFromTop - windowHeight);
          element.classList.add('progress-value' + i);
          element.classList.remove('hidden');
        } else {
          first++;
        }
      }
    }
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
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
  //buildProgressBarTable(main); 
  //addDynamic(main);
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
