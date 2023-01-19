const VIDEO_HOST = 'https://www.youtube.com';

function loadVideo(videoURL, block) {
  const overlay = document.createElement('div');
  overlay.classList.add('video-player-overlay');

  block.parentElement.appendChild(overlay);

  const videoIframe = document.createElement('iframe');
  videoIframe.classList.add('video-player-iframe');
  // only for youtube videos for now:
  videoIframe.src = `${VIDEO_HOST}/embed${videoURL.pathname}`;

  block.appendChild(videoIframe);

  overlay.addEventListener('click', () => {
    block.parentElement.removeChild(overlay);
    block.removeChild(videoIframe);
  });
}

export default async function decorate(block) {
  const videoURL = new URL(block.getElementsByTagName('a')[0].innerText);

  block.addEventListener('click', () => loadVideo(videoURL, block));
}
