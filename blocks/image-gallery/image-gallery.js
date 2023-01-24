import { generateImageOverlay } from '../../scripts/delayed.js';

export default async function decorate(block) {
  const pictures = block.getElementsByTagName('picture');

  Object.values(pictures).forEach((pic) => {
    pic.addEventListener('mouseover', () => {
      pic.style.opacity = '0.8';
    });
    pic.addEventListener('mouseleave', () => {
      pic.style.opacity = '1';
    });

    pic.addEventListener('click', (e) => {
      generateImageOverlay(e, block, pictures);
    });
  });
}
