import { generateImageOverlay } from '../../scripts/delayed.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const breakpoints = [
    { media: '(min-width: 1200px)', width: '300' },
    { media: '(min-width: 800px)', width: '250' },
    { media: '(min-width: 700px)', width: '300' },
    { media: '(min-width: 500px)', width: '250' },
    { width: '150' }];

  Array.from(block.getElementsByTagName('picture')).forEach((oldPicture) => {
    const i = oldPicture.querySelector('img');
    const picture = createOptimizedPicture(i.src, i.alt, false, i.width, i.height, breakpoints);
    oldPicture.replaceWith(picture);
  });

  const pictures = block.getElementsByTagName('picture');
  Array.from(pictures).forEach((picture) => {
    picture.addEventListener('mouseover', () => {
      picture.style.opacity = '0.8';
    });
    picture.addEventListener('mouseleave', () => {
      picture.style.opacity = '1';
    });

    picture.addEventListener('click', (e) => {
      generateImageOverlay(e, block, pictures);
    });
  });
}
