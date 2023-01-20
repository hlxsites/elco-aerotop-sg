import loadVideo from '../../scripts/delayed.js';

export default async function decorate(block) {
  const videoURL = new URL(block.getElementsByTagName('a')[0].innerText);
  block.addEventListener('click', () => loadVideo(videoURL, block));
}
