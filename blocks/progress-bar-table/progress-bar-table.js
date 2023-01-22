import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

let compareValues=[];

function calculateRatio(elements) {

  const sizel = elements.length;
  console.log('size is ' + sizel);
  console.log('antes elements');
  console.log(elements);
  console.log('despues elements');
  let ratio1;
  let ratio2;
  if (sizel == 2) {
    return [100, 0];
  } else {

    let childNodes1 = elements[1].childNodes;
    let childNodes2 = elements[2].childNodes;
    for(let uno=0;uno<childNodes1.length;uno++)
    {
      console.log('empieza'+uno);
console.log(childNodes1[uno]);
console.log('termina');
    }

    ratio1 = parseInt(childNodes1[5].textContent);
    ratio2 = parseInt(childNodes2[5].textContent);
    console.log('avant calcul '+'ratio1 '+ratio1+' :ratio2 '+ratio2);
    if (ratio2 > ratio1) {
      ratio1 = Math.floor(ratio1 * 100 / ratio2);
      ratio2 = 100;
    } else {
      ratio2 = Math.floor(ratio2 * 100 / ratio1);
      ratio1 = 100;
    }
    console.log('ratio1 '+ratio1+' :ratio2 '+ratio2);
    return [ratio1, ratio2];
  }

}

function calculateRatioPost(elements) {

  const sizel = elements.length;
  console.log('size is ' + sizel);
  console.log('antes elements');
  console.log(elements); 
  console.log('despues elements');
  let ratio1;
  let ratio2;
  if (sizel == 2) {
    return [100, 0];
  } else {

    let childNodes1 = elements[1].childNodes;
    let childNodes2 = elements[2].childNodes;
    for(let uno=0;uno<childNodes1.length;uno++)
    {
      console.log('empieza'+uno);
console.log(childNodes1[uno]);
console.log('termina');
    }

    ratio1 = parseFloat(childNodes1[7].textContent.substring(0, childNodes1[7].textContent.indexOf(' ')));
    ratio2 = parseFloat(childNodes2[7].textContent.substring(0, childNodes1[7].textContent.indexOf(' ')));
    console.log('avant calcul '+'ratio1 '+ratio1+' :ratio2 '+ratio2);
    if (ratio2 > ratio1) {
      ratio1 = Math.floor(ratio1 * 100 / ratio2);
      ratio2 = 100;
    } else {
      ratio2 = Math.floor(ratio2 * 100 / ratio1);
      ratio1 = 100;
    }
    console.log('ratio1 '+ratio1+' :ratio2 '+ratio2);
    return [ratio1, ratio2];
  }

}


function addDynamic2(block) {
  let options = {
    root: document.root,
    rootMargin: '0px',
    threshold: [0, 1]
  }
  console.log(block);

  const elements = block.querySelectorAll('.progress-bar-table > div');
  let observer = new IntersectionObserver(callback, options);
  let target = block;
  console.log('target '+target);
  observer.observe(target);
}

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    //alert('inside'+entry.target.innerHTML);
    console.log('entry lengths '+entries.length);
    console.log('antes');
    console.log(entry.target);
    console.log('despues');
    const elements= entry.target.querySelectorAll('.progress-bar-table > div');
    console.log(elements);
    const compareTheValues = calculateRatioPost(elements);
    const toChangea=entry.target.querySelector(".progress-value-1");
    //alert('antes 0');
    toChangea.style.width=('0%');
    //alert('0');
    toChangea.style.width=(compareTheValues[0]+'%');
    //alert(compareTheValues[1]);
    const toChangeb=entry.target.querySelector(".progress-value-2");
    //alert('antes 0');
    toChangeb.style.width=('0%');
    //alert('0');
    toChangeb.style.width=(compareTheValues[1]+'%');
    if(entries[0].intersectionRatio === 0) {
      toChangea.style.width=('0%'); 
      toChangeb.style.width=('0%');
    }
console.log(entry.target);
  });
};



function buildProgressBarTable(block, numberStyles) {
  console.log('we entered the function with numberStyles' + numberStyles);
  numberStyles++;
  const totalTables = block.querySelectorAll('.progress-bar-table-wrapper > div');
  const elements = block.querySelectorAll('.progress-bar-table > div');
  const sizel = elements.length;
  //console.log('size is ' + sizel);
  //console.log(elements);
  let title;
  let description;
  let size;
  let units;
  let subtitle;
  let comparateValues = calculateRatio(elements);
  //console.log(comparateValues);
  for (let i = 0; i < sizel; i++) {
    if (i !== 0) {

      elements[i].classList.add('progress-wrapper');
      let childNodes = elements[i].childNodes;

      childNodes[1].classList.add('progress-title-'+i);
      console.log('*******************************');
console.log(childNodes[1]);
      childNodes[3].classList.add('progress-description-'+i);
      let ratio = childNodes[5].textContent;

      childNodes[5].textContent = '';
      childNodes[5].classList.add('progress');
      childNodes[5].classList.add('progress-aside-1'+i);
      childNodes[5].classList.add('aside');
      //childNodes[5].classList.add('progress-value-'+i);
      //childNodes[5].style.width=('100%');
      const progress2 = document.createElement('div');
      progress2.classList.add('progress-value-'+i);
      progress2.style.width=('0%');
      childNodes[5].appendChild(progress2);

      childNodes[7].classList.add('progress');
      childNodes[7].classList.add('progress-aside-2'+i);
      childNodes[7].classList.add('aside');
      const progressValue = document.createElement('h2');
      const unitMeasure = childNodes[7].textContent;
      childNodes[7].textContent='';
      childNodes[7].appendChild(progressValue);
      progressValue.textContent = ratio + ' ' + unitMeasure;
      childNodes[9].classList.add('progress-subtitle-'+i);

      numberStyles++;

    } else {
      //numberStyles++;
      elements[i].style.display = 'none';
    }
  }
}




export default async function decorate(block) {
  const main = document.querySelector('main');
  document.getElementsByTagName('head')[0];

  const elements = block.querySelectorAll('.progress-bar-table > div');
  //compareValues=[];
  //compareValues = calculateRatio(elements);

  buildProgressBarTable(block);
  addDynamic2(block);


}