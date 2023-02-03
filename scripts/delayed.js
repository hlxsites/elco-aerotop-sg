// eslint-disable-next-line import/no-cycle
import { fetchPlaceholders, sampleRUM } from './lib-franklin.js';
import loadVideoImpl from './assets/video-lib.js';
import generateImageOverlayImpl from './assets/image-lib.js';
import loadCookieConsent from './cookie-consent-lib.js';

function googleTagManager() {
  const script = document.createElement('script');
  script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-MZJ7DB9');`;
  document.body.appendChild(script);
}

function googleAnalytics() {
  const asyncScript = document.createElement('script');
  asyncScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-Y5TC8B0GX4';
  asyncScript.setAttribute('async', '');
  document.body.appendChild(asyncScript);

  const script = document.createElement('script');
  script.innerHTML = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-Y5TC8B0GX4');`;
  document.body.appendChild(script);
}

function hotjar() {
  const script = document.createElement('script');
  script.innerHTML = `(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:2763082,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
  document.body.appendChild(script);
}

// used by cookie-consent so far
await fetchPlaceholders(`/${document.documentElement.lang}`);

loadCookieConsent();

// Core Web Vitals RUM collection
sampleRUM('cwv');

// MarTech integrations
googleTagManager();
googleAnalytics();
hotjar();

export default function loadVideo(videoURL, block) {
  loadVideoImpl(videoURL, block);
}

export function generateImageOverlay(event, block, pictures) {
  generateImageOverlayImpl(event, block, pictures);
}
