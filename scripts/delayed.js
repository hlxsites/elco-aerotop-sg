// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';
import loadVideoImpl from './video-lib.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

export default function loadVideo(videoURL, block) {
  loadVideoImpl(videoURL, block);
}
