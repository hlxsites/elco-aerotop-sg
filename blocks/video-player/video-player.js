function loadVideo(videoURL, block) {
  const VIDEO_HOST = 'https://www.youtube.com';
  const overlay = document.createElement('div');
  overlay.classList.add('video-player-overlay');
  block.parentElement.appendChild(overlay);

  const toolbar = document.createElement('div');
  toolbar.classList.add('video-player-toolbar');
  const toolbarClose = document.createElement('div');
  toolbarClose.classList.add('video-player-close');
  toolbar.appendChild(toolbarClose);
  block.parentElement.appendChild(toolbar);

  const videoIframe = document.createElement('iframe');
  videoIframe.classList.add('video-player-iframe');
  videoIframe.src = `${VIDEO_HOST}/embed${videoURL.pathname}`;

  block.appendChild(videoIframe);

  overlay.addEventListener('click', () => {
    block.parentElement.removeChild(overlay);
    block.parentElement.removeChild(toolbar);
    block.removeChild(videoIframe);
  });
  toolbarClose.addEventListener('click', () => {
    block.parentElement.removeChild(overlay);
    block.parentElement.removeChild(toolbar);
    block.removeChild(videoIframe);
  });
}

export default async function decorate(block) {
  const videoURL = new URL(block.getElementsByTagName('a')[0].innerText);

  block.addEventListener('click', () => loadVideo(videoURL, block));

}
