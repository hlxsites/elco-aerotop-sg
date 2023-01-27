function animateLid(lid, ratio) {
  // ratio: 0.6 > margin-top: 12%
  // ratio: 0.4 > margin-top: 6%
  // 1 step = 6 / (0.6 - 0.4) = 30
  if (ratio > 0.6) {
    lid.style.marginTop = '12%';
  } else if (ratio < 0.4) {
    lid.style.marginTop = '6%';
  } else {
    lid.style.marginTop = `${(ratio - 0.4) * 30 + 6}%`;
  }
}

function animateVent(lid, ratio) {
  // ratio: 0.6 > margin-top: 7%
  // ratio: 0.4 > margin-top: 4%
  // 1 step = 3 / (0.6 - 0.4) = 15
  if (ratio > 0.6) {
    lid.style.marginTop = '7%';
  } else if (ratio < 0.4) {
    lid.style.marginTop = '4%';
  } else {
    console.log(ratio);
    lid.style.marginTop = `${(ratio - 0.4) * 15 + 4}%`;
  }
}

function animateTexts(texts, ratio) {
  // ratio: 0.4 > opacity: 0
  // ratio: 0.33 > opacity: 1
  // 1 step = 1 / (0.4 - 0.33) = 14
  if (ratio > 0.4) {
    texts.forEach((text) => {
      text.style.opacity = 0;
    });
  } else if (ratio < 0.33) {
    texts.forEach((text) => {
      text.style.opacity = 1;
    });
  } else {
    texts.forEach((text) => {
      text.style.opacity = `${(0.4 - ratio) * 14}`;
    });
  }
}

export default async function decorate(block) {
  const lid = block.querySelector(':scope > div:nth-child(1)');
  const vent = block.querySelector(':scope > div:nth-child(2)');
  const texts = block.querySelectorAll(':scope > div:nth-child(n+4)');

  window.addEventListener('scroll', () => {
    const { top, height } = block.getBoundingClientRect();
    if (top > 0 && top < height) {
      const ratio = top / height;

      animateLid(lid, ratio);
      animateVent(vent, ratio);
      animateTexts(texts, ratio);
    }
  }, false);
}
