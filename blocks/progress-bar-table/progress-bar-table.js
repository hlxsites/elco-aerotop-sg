function calculateRatioPost(elements) {
  const sizel = elements.length;
  let ratio1;
  let ratio2;
  if (sizel === 2) return [100, 0];
  const childNodes1 = elements[1].childNodes;
  const childNodes2 = elements[2].childNodes;
  ratio1 = parseFloat(childNodes1[7].textContent.substring(0, childNodes1[7].textContent.indexOf(' ')));
  ratio2 = parseFloat(childNodes2[7].textContent.substring(0, childNodes1[7].textContent.indexOf(' ')));
  if (ratio2 > ratio1) {
    ratio1 = Math.floor((ratio1 * 100) / ratio2);
    ratio2 = 100;
  } else {
    ratio2 = Math.floor((ratio2 * 100) / ratio1);
    ratio1 = 100;
  }
  return [ratio1, ratio2];
}

const callback = (entries) => {
  entries.forEach((entry) => {
    const elements = entry.target.querySelectorAll('.progress-bar-table > div');
    const compareTheValues = calculateRatioPost(elements);
    const toChangea = entry.target.querySelector('.progress-value-1');
    toChangea.style.width = ('0%');
    toChangea.style.width = (`${compareTheValues[0]}%`);
    const toChangeb = entry.target.querySelector('.progress-value-2');
    toChangeb.style.width = ('0%');
    toChangeb.style.width = (`${compareTheValues[1]}%`);
    if (entries[0].intersectionRatio === 0) {
      toChangea.style.width = ('0%');
      toChangeb.style.width = ('0%');
    }
  });
};

function addDynamic2(block) {
  const options = {
    root: document.root,
    rootMargin: '0px',
    threshold: [0, 1],
  };

  const observer = new IntersectionObserver(callback, options);
  const target = block;
  observer.observe(target);
}

function buildProgressBarTable(block) {
  const elements = block.querySelectorAll('.progress-bar-table > div');
  const sizel = elements.length;
  for (let i = 0; i < sizel; i += 1) {
    if (i !== 0) {
      elements[i].classList.add('progress-wrapper');
      const progresschildNodes = elements[i].childNodes;
      progresschildNodes[1].classList.add(`progress-title-${i}`);
      progresschildNodes[3].classList.add(`progress-description-${i}`);
      const ratio = progresschildNodes[5].textContent;
      progresschildNodes[5].textContent = '';
      progresschildNodes[5].classList.add('progress');
      progresschildNodes[5].classList.add(`progress-aside-1${i}`);
      progresschildNodes[5].classList.add('aside');
      const progress2 = document.createElement('div');
      progress2.classList.add(`progress-value-${i}`);
      progress2.style.width = ('0%');
      progresschildNodes[5].appendChild(progress2);
      progresschildNodes[7].classList.add('progress');
      progresschildNodes[7].classList.add(`progress-aside-2${i}`);
      progresschildNodes[7].classList.add('aside');
      const progressValue = document.createElement('h2');
      const unitMeasure = progresschildNodes[7].textContent;
      progresschildNodes[7].textContent = '';
      progresschildNodes[7].appendChild(progressValue);
      progressValue.textContent = `${ratio} ${unitMeasure}`;
      progresschildNodes[9].classList.add(`progress-subtitle-${i}`);
    } else {
      elements[i].style.display = 'none';
    }
  }
}

export default async function decorate(block) {
  buildProgressBarTable(block);
  addDynamic2(block);
}
