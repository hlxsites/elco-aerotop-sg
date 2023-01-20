function loadVideo(videoURL, block) {
  const VIDEO_HOST = 'https://www.youtube.com';
  const overlay = document.createElement('div');
  overlay.classList.add('youtube-player-overlay');
  block.parentElement.appendChild(overlay);

  const toolbar = document.createElement('div');
  toolbar.classList.add('youtube-player-toolbar');
  const toolbarClose = document.createElement('div');
  toolbarClose.classList.add('youtube-player-close');
  toolbar.appendChild(toolbarClose);
  block.parentElement.appendChild(toolbar);

  const videoIframe = document.createElement('iframe');
  videoIframe.classList.add('youtube-player-iframe');
  videoIframe.setAttribute('allowfullscreen', '');
  videoIframe.src = `${VIDEO_HOST}/embed${videoURL.pathname}`;

  block.appendChild(videoIframe);
  function escEvent(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      // eslint-disable-next-line no-use-before-define
      removeVideo();
    }
  }
  function removeVideo() {
    block.parentElement.removeChild(overlay);
    block.parentElement.removeChild(toolbar);
    block.removeChild(videoIframe);
    window.removeEventListener('keydown', escEvent);
  }

  window.addEventListener('keydown', escEvent);

  overlay.addEventListener('click', () => {
    removeVideo();
  });
  toolbarClose.addEventListener('click', () => {
    removeVideo();
  });
}

export default async function decorate(block) {
  const videoURL = new URL(block.getElementsByTagName('a')[0].innerText);
  block.addEventListener('click', () => loadVideo(videoURL, block));
}
