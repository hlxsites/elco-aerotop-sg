// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

// eslint-disable-next-line import/prefer-default-export
export function loadVideo(videoURL, block) {
  const VIDEO_HOST = 'https://www.youtube.com';
  const overlay = document.createElement('div');
  overlay.classList.add('video-player-overlay');

  block.parentElement.appendChild(overlay);

  const videoIframe = document.createElement('iframe');
  videoIframe.classList.add('video-player-iframe');
  videoIframe.src = `${VIDEO_HOST}/embed${videoURL.pathname}`;

  block.appendChild(videoIframe);

  overlay.addEventListener('click', () => {
    block.parentElement.removeChild(overlay);
    block.removeChild(videoIframe);
  });
}
