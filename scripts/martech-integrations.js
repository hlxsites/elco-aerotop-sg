const GOOGLE_TAG_MANAGER_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-MZJ7DB9');`;

const GTAG_URL = 'https://www.googletagmanager.com/gtag/js?id=G-Y5TC8B0GX4';
const GOOGLE_ANALYTICS_SCRIPT = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-Y5TC8B0GX4');`;

const HOTJAR_SCRIPT = `(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:3351234,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;

function createExternalScriptElement(url) {
  const script = document.createElement('script');
  // script.type = 'text/partytown';
  script.src = url;
  script.setAttribute('async', '');
  document.head.appendChild(script);
}

function createInlineScriptElement(innerHTML) {
  const script = document.createElement('script');
  // script.type = 'text/partytown';
  script.innerHTML = innerHTML;
  document.head.appendChild(script);
}

export default function integrateMartech() {
  createInlineScriptElement(GOOGLE_TAG_MANAGER_SCRIPT);

  createExternalScriptElement(GTAG_URL);
  createInlineScriptElement(GOOGLE_ANALYTICS_SCRIPT);

  createInlineScriptElement(HOTJAR_SCRIPT);
}
