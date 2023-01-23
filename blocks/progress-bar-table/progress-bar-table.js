function calculateRatioPost(elements) {
  const numElements = elements.length;

  let ratio1 = 100;
  let ratio2 = 100;

  if (numElements === 2) return [100, 0];

  const childNodes1 = elements[1].childNodes;
  const childNodes2 = elements[2].childNodes;

  const progress1 = parseFloat(childNodes1[7].textContent.substring(0, childNodes1[7].textContent.indexOf(' ')));
  const progress2 = parseFloat(childNodes2[7].textContent.substring(0, childNodes1[7].textContent.indexOf(' ')));
  
  if (progress2 > progress1) {
    ratio1 = Math.floor((progress1 * 100) / progress2);
  } else {
    ratio2 = Math.floor((progress2 * 100) / progress1);
  }

  return [ratio1, ratio2];
}

const callback = (entries) => {
  entries.forEach((entry) => {
    const elements = entry.target.querySelectorAll('.progress-bar-table > div');
    const ratios = calculateRatioPost(elements);

    const progress1Element = entry.target.querySelector('.progress-value-1');
    progress1Element.style.width = ('0%');
    progress1Element.style.width = (`${ratios[0]}%`);

    const progress2Element = entry.target.querySelector('.progress-value-2');
    progress2Element.style.width = ('0%');
    progress2Element.style.width = (`${ratios[1]}%`);

    if (entries[0].intersectionRatio === 0) {
      progress1Element.style.width = ('0%');
      progress2Element.style.width = ('0%');
    }
  });
};

function addObserver(block) {
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

  elements.forEach((element, i) => {
    if (i === 0) {
      elements[i].style.display = 'none';
      return;
    }
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
  });
}
  
export default async function decorate(block) {
  buildProgressBarTable(block);
  addObserver(block);
}
