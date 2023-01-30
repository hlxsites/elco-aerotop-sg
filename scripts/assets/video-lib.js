import { loadCSS } from '../lib-franklin.js';
import createOverlay from './asset-lib.js';

export default function loadVideoImpl(videoURL, block) {
  loadCSS(`${window.hlx.codeBasePath}/styles/asset-viewer/asset-viewer.css`);
  const overlay = document.createElement('div');
  overlay.classList.add('asset-viewer-overlay');
  block.parentElement.appendChild(overlay);

  const { toolbar, toolbarClose } = createOverlay(block);

  const videoIframe = document.createElement('iframe');
  videoIframe.classList.add('youtube-player-iframe');
  videoIframe.setAttribute('allowfullscreen', '');
  videoIframe.src = `https://www.youtube.com/embed${videoURL.pathname}`;

  block.appendChild(videoIframe);

  function createEscEvent(fn) {
    return (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        fn();
      }
    };
  }

  let escEvent;
  function removeVideo() {
    block.parentElement.removeChild(overlay);
    block.parentElement.removeChild(toolbar);
    block.removeChild(videoIframe);
    window.removeEventListener('keydown', escEvent);
  }

  escEvent = createEscEvent(removeVideo);

  window.addEventListener('keydown', escEvent);

  overlay.addEventListener('click', () => {
    removeVideo();
  });
  toolbarClose.addEventListener('click', () => {
    removeVideo();
  });
}
