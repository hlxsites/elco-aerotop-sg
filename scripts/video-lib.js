export default function loadVideoImpl(videoURL, block) {
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
