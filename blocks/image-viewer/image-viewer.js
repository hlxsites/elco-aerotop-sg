import { loadCSS } from '../../scripts/lib-franklin.js';
import createOverlay from '../../scripts/assets/asset-lib.js';

export default async function decorate(block) {
  loadCSS(`${window.hlx.codeBasePath}/styles/asset-viewer/asset-viewer.css`);

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

      const originalImage = e.currentTarget.getElementsByTagName('img')[0];

      const image = document.createElement('img');
      image.classList.add('image-viewer-image');
      image.src = originalImage.src;
      image.loading = originalImage.loading;
      image.type = originalImage.type;
      image.width = window.innerWidth;
      image.style.opacity = '0';

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('image-viewer-overlay');
      imageWrapper.appendChild(image);
      block.parentElement.appendChild(imageWrapper);

      function removeImage() {
        block.parentElement.removeChild(overlay);
        block.parentElement.removeChild(toolbar);
        block.parentElement.removeChild(imageWrapper);
        image.remove();
        backToTop.style.display = 'block';
      }

      imageWrapper.addEventListener('click', () => {
        removeImage();
      });
      toolbarClose.addEventListener('click', () => {
        removeImage();
      });

      setTimeout(() => {
        overlay.removeAttribute('style');
        image.removeAttribute('style');
      }, 0);
    });
  });
}
