import { generateImageOverlay } from '../../scripts/delayed.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const breakpoints = [{ media: '(min-width: 1000px)', width: '2000' }, { media: '(min-width: 450px)', width: '750' }, { media: '(min-width: 200px)', width: '450' }, { width: '200' }];

  Array.from(block.getElementsByTagName('picture')).forEach((oldPicture) => {
    const i = oldPicture.querySelector('img');
    const picture = createOptimizedPicture(i.src, i.alt, false, breakpoints, i.width, i.height);
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
