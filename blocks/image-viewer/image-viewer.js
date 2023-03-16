import { createOptimizedPicture, loadCSS } from '../../scripts/lib-franklin.js';
import createOverlay from '../../scripts/assets/asset-lib.js';

export default async function decorate(block) {
  loadCSS(`${window.hlx.codeBasePath}/styles/asset-viewer/asset-viewer.css`);
  const breakpoints = [{ media: '(min-width: 1000px)', width: '2000' }, { media: '(min-width: 500px)', width: '750' }, { width: '300' }];
  block.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, breakpoints, img.width, img.height)));

  const pictures = block.getElementsByTagName('picture');
  Object.values(pictures).forEach((pic) => {
    pic.addEventListener('click', (e) => {
      const backToTop = document.getElementById('back-to-top');
      backToTop.style.display = 'none';

      const overlay = document.createElement('div');
      overlay.classList.add('asset-viewer-overlay');
      overlay.style.opacity = 0;
      block.parentElement.appendChild(overlay);

      const { toolbar, toolbarClose } = createOverlay(block);

      const toolbarFullScreen = document.createElement('div');
      toolbarFullScreen.classList.add('asset-viewer-fullscreen');
      toolbar.appendChild(toolbarFullScreen);

      const viewedImage = e.target.closest('picture').cloneNode(true);

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('image-viewer-overlay');
      imageWrapper.appendChild(viewedImage);
      block.parentElement.appendChild(imageWrapper);

      async function removeImage() {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          block.style.display = 'block';
        }
        block.parentElement.removeChild(overlay);
        block.parentElement.removeChild(toolbar);
        block.parentElement.removeChild(imageWrapper);
        viewedImage.remove();
        backToTop.style.display = 'block';
      }

      imageWrapper.addEventListener('click', () => {
        removeImage();
      });
      toolbarClose.addEventListener('click', () => {
        removeImage();
      });

      toolbarFullScreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          block.style.display = 'none';
          block.parentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      });

      setTimeout(() => {
        overlay.removeAttribute('style');
      }, 0);
    });
  });
}
