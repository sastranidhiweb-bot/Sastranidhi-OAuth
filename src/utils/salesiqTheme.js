// Themes the inside of the Zoho SalesIQ chat window in the site's royal
// violet + gold.
//
// The launcher and bubble are styled from salesiq-theme.css, but the chat
// window is an <iframe id="siq_chatwindow"> that Zoho's script creates and
// fills from our own page (same origin, no src). Our stylesheets can't reach
// inside it, so this watches for that iframe and adds a <style> to its
// document. Zoho sets its brand colour as inline CSS variables on the
// iframe's <html>; the !important rules below win over those.
//
// Built against Zoho's widget markup as of Nov 2026; if Zoho changes its
// class names or variables, some of these rules may stop applying (the chat
// keeps working, it just falls back to the dashboard colours).

const STYLE_ID = 'sn-siq-theme';

const CSS = `
:root, html {
  --siqcw-custom-bg-color: #2a1263 !important;
  --siqcw-custom-color: #2a1263 !important;
  --siqcw-custom-secondary-bg: #2a1263 !important;
  --siqcw-minimise-button-bg-color: #2a1263 !important;
  --siqcw-custom-text-color: #3b1a7a !important;
  --siqcw-custom-icon-color: #3b1a7a !important;
  --siqcw-custom-border-color: #E8C34A !important;
  --siqcw-dynamic-text-color: #F3DFA0 !important;
  --siqcw-online-bg-color: #E8C34A !important;
  --siqcw-header-bg-color: #2a1263 !important;
}

/* Headers (home "Hi there!" banner and the conversation header): violet
   gradient with a soft gold glow and a gold underline */
.siqcw-header,
.siqcw-header:after {
  background:
    radial-gradient(ellipse 90% 70% at 85% 0%, rgba(232, 195, 74, 0.22), transparent 60%),
    radial-gradient(ellipse at 0% 100%, rgba(107, 50, 198, 0.55), transparent 60%),
    linear-gradient(160deg, #2a1263 0%, #1c0c42 100%) !important;
}
.siqcw-header { border-bottom: 1px solid rgba(232, 195, 74, 0.5); }
`;

function inject(iframe) {
  let doc;
  try {
    doc = iframe.contentDocument;
  } catch {
    return; // not same-origin after all: leave it to the dashboard colours
  }
  if (!doc || !doc.head) return;
  let style = doc.getElementById(STYLE_ID);
  if (!style) {
    style = doc.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
  }
  // Keep ours last in <head> so it follows the stylesheets Zoho adds later
  if (style !== doc.head.lastElementChild) doc.head.appendChild(style);
}

function watchFrame(iframe) {
  if (iframe.dataset.snThemed) return;
  iframe.dataset.snThemed = '1';

  let observer;
  const attach = () => {
    inject(iframe);
    observer?.disconnect();
    const doc = iframe.contentDocument;
    if (!doc) return;
    // Zoho writes the window's markup and stylesheets in after load
    observer = new MutationObserver(() => inject(iframe));
    observer.observe(doc.documentElement, { childList: true, subtree: true });
  };
  iframe.addEventListener('load', attach);
  attach();
}

export function themeSalesIQ() {
  const find = () => {
    const iframe = document.getElementById('siq_chatwindow');
    if (iframe) watchFrame(iframe);
  };
  find();
  new MutationObserver(find).observe(document.body, { childList: true, subtree: true });
}
