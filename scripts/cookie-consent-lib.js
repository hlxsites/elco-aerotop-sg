/**
 * Loads and configures the cookie consent library:
 *
 * https://github.com/sandstreamdev/cookieconsent
 */

const REVOKE_CONSENT_ELEMENT_ID = 'cc-revoke-choice';
const configureCookieConsent = () => {
  if (!window.CookieConsent) {
    // eslint-disable-next-line no-console
    console.warn('Cookie Consent not loaded');
    return;
  }

  const CC = window.CookieConsent;

  const cc = new CC({
    // just some default styling
    type: 'opt-in',
    consentSettingsElementId: REVOKE_CONSENT_ELEMENT_ID,
    layout: 'categories',
    showCategories: {
      [CC.UNCATEGORIZED]: false,
      [CC.ESSENTIAL]: true,
      [CC.PERSONALIZATION]: false,
      [CC.ANALYTICS]: true,
      [CC.MARKETING]: false,
    },
    content: {
      privacyPolicyLink: '/privacy-policy',
      cookiePolicyLink: '/cookie-policy',
    },
    cookie: {
      domain: '[your domain here]',
      name: '[your cookie name if needed]',
    },
  });

  function isGTMInitialized() {
    return window.gtmInitialized;
  }

  function initializeGTM() {
    if (!isGTMInitialized()) {
      // window.dataLayer = window.dataLayer || [];
      // window.dataLayer.push({
      //   'gtm.start': new Date().getTime(),
      //   event: 'gtm.js'
      // });
      // var f = document.getElementsByTagName('script')[0];
      // var j = document.createElement('script');
      // j.async = true;
      // j.src =
      //   'https://www.googletagmanager.com/gtm.js?id=[ YOUR_GTM_CONTAINER_ID ]';
      // f.parentNode.insertBefore(j, f);
      window.gtmInitialized = true;
    }
  }

  function uninitializeGTM() {
    // remove cookies
    cc.deleteCookie('_ga');
    cc.deleteCookie('_gid');
    // cc.deleteCookie('_gat_YOUR_GOOGLE_ANALYTICS_TRACKING_ID');

    // reload page to get rid of GTM
    window.location.reload();
  }

  cc.on('initialized', () => {
    const { consents } = cc;

    if (consents[CC.ANALYTICS] === CC.ALLOW) {
      initializeGTM();
    }
  });

  cc.on('popupClosed', () => {
    const { consents } = cc;

    if (consents[CC.ANALYTICS] === CC.ALLOW) {
      initializeGTM();
    } else if (isGTMInitialized()) {
      uninitializeGTM();
    }
  });
};

export default function loadCookieConsent() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '/styles/cookie-consent/cookieconsent.min.css');

  const script = document.createElement('script');
  script.src = '/scripts/cookie-consent/cookieconsent.min.js';
  script.onload = configureCookieConsent;

  const revokeElement = document.createElement('div');
  revokeElement.setAttribute('id', REVOKE_CONSENT_ELEMENT_ID);
  revokeElement.innerHTML = 'Change my consent';

  document.head.appendChild(link);
  document.head.appendChild(script);
  document.body.appendChild(revokeElement);
}
