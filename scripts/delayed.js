// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';
import loadVideoImpl from './video-lib.js';
import loadCookieConsent from './cookie-consent-lib.js';

loadCookieConsent();

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

export default function loadVideo(videoURL, block) {
  loadVideoImpl(videoURL, block);
}
