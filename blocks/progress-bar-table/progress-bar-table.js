import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

function calculateRatio(elements) {

  const sizel = elements.length;
  console.log('size is ' + sizel);
  console.log(elements);
  let ratio1;
  let ratio2;
  if (sizel == 2) {
    return [100, 0];
  } else {

    let childNodes1 = elements[1].childNodes;
    let childNodes2 = elements[2].childNodes;
    ratio1 = parseInt(childNodes1[5].textContent);
    ratio2 = parseInt(childNodes2[5].textContent);
    if (ratio2 > ratio1) {
      ratio1 = Math.floor(ratio1 * 100 / ratio2);
      ratio2 = 100;
    } else {
      ratio2 = Math.floor(ratio2 * 100 / ratio1);
      ratio1 = 100;
    }
    return [ratio1, ratio2];
  }

}

function buildProgressBarTable(main, numberStyles) {
  console.log('we entered the function with numberStyles' + numberStyles);
  numberStyles++;
  const totalTables = main.querySelectorAll('.progress-bar-table-wrapper > div');
  const elements = main.querySelectorAll('.progress-bar-table > div');
  const sizel = elements.length;
  console.log('size is ' + sizel);
  console.log(elements);
  let title;
  let description;
  let size;
  let units;
  let subtitle;
  let comparateValues = calculateRatio(elements);
  console.log(comparateValues);
  for (let i = 0; i < sizel; i++) {
    if (i !== 0) {
      console.log('we are with i =' + i)
      elements[i].classList.add('progress-wrapper');
      let childNodes = elements[i].childNodes;
      console.log(childNodes.length);
      console.log(childNodes[0]);
      console.log(childNodes[1]);
      childNodes[1].classList.add('progress-title');
      console.log(childNodes[2]);
      console.log(childNodes[3]);
      childNodes[3].classList.add('progress-description');
      let ratio = childNodes[5].textContent;
      let style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '.progress-value' + numberStyles + ' { animation: load' + numberStyles + ' 3s normal forwards; box-shadow: 0 10px 40px -10px #fff; border-radius: 100px; background: blue; height: 30px; width: 0;}';
      document.getElementsByTagName('head')[0].appendChild(style);
      let style2 = document.createElement('style');
      style2.type = 'text/css';
      style2.innerHTML = '@keyframes load' + numberStyles + ' { 0% { width: 0; } 100% { width: ' + comparateValues[i - 1] + '%; }}';
      document.getElementsByTagName('head')[0].appendChild(style2);
      console.log(childNodes[4]);
      console.log(childNodes[5]);
      childNodes[5].textContent = '';
      childNodes[5].classList.add('progress');
      childNodes[5].classList.add('progress-aside-1');
      childNodes[5].classList.add('aside');
      const progress2 = document.createElement('div');
      progress2.classList.add('progress-value' + numberStyles);
      childNodes[5].appendChild(progress2);
      console.log(childNodes[6]);
      console.log(childNodes[7]);
      childNodes[7].classList.add('progress');
      childNodes[7].classList.add('progress-aside-2');
      childNodes[7].classList.add('aside');
      childNodes[7].textContent = ratio + ' ' + childNodes[7].textContent;
      console.log(childNodes[8]);
      console.log(childNodes[9]);
      childNodes[9].classList.add('progress-subtitle');
      console.log(childNodes[10]);
      numberStyles++;

    } else {
      elements[i].style.display = 'none';
    }
  }
}




export default async function decorate(block) {
  const main = document.querySelector('main');
  document.getElementsByTagName('head')[0];
  let numberOfStyles = 0;
  const childStyles = document.getElementsByTagName('head')[0].childNodes;
  for (let stylesInPage = 0; stylesInPage < childStyles.length; stylesInPage++) {
    if (typeof childStyles[stylesInPage].innerHTML !== 'undefined') {
      if (childStyles[stylesInPage].innerHTML.startsWith('.progress-value')) {
        if (numberOfStyles < parseInt(childStyles[stylesInPage].innerHTML.substr(15, 2))) numberOfStyles = parseInt(childStyles[stylesInPage].innerHTML.substr(15, 2));
      }
    }
  }
  buildProgressBarTable(block, numberOfStyles);

}