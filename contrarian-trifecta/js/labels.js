import { t } from './i18n.js';

export function updateStaticLabels() {
  setText('.toolbar__title', t('toolbar.title'));
  setText('.toolbar__subtitle', t('toolbar.subtitle'));

  setAttr('#global-search', 'placeholder', t('toolbar.searchPlaceholder'));
  setAttr('#legend-toggle', 'aria-label', t('toolbar.legendLabel'));
  setAttr('#legend-toggle', 'title', t('toolbar.legendTitle'));
  setAttr('#theme-toggle', 'aria-label', t('toolbar.themeLabel'));
  setAttr('#theme-toggle', 'title', t('toolbar.themeTitle'));

  setTabText('trifecta', t('tab.trifecta'));
  setTabText('technical', t('tab.technical'));
  setTabText('fundamentals', t('tab.fundamentals'));
  setTabText('sentiment', t('tab.sentiment'));
  setTabText('backtest', t('tab.backtest'));

  setText('#footer-disclaimer', t('footer.disclaimer'));

  const attrEl = document.getElementById('footer-attribution');
  if (attrEl) {
    const email = t('footer.contact');
    attrEl.innerHTML = `${t('footer.attribution')} | Contact: <a href="mailto:${email}" id="footer-email">${email}</a>`;
  }

  setText('.cta-section__tagline', t('cta.tagline'));

  updateLegend();
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function setAttr(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function setTabText(tab, text) {
  const el = document.querySelector(`[data-tab="${tab}"]`);
  if (el) el.textContent = text;
}

function updateLegend() {
  const panel = document.getElementById('legend-panel');
  if (!panel) return;

  const title = panel.querySelector('.legend-panel__title');
  if (title) title.textContent = t('legend.title');

  const sections = panel.querySelectorAll('.legend-section h3');
  const sectionKeys = [
    'legend.scoreRanges', 'legend.ratingLabels', 'legend.trifectaPillars',
    'legend.badges', 'legend.technicalIndicators', 'legend.fundamentalArrows'
  ];
  sections.forEach((h3, i) => {
    if (sectionKeys[i]) h3.textContent = t(sectionKeys[i]);
  });

  const descs = panel.querySelectorAll('.legend-desc');
  const descKeys = [
    'legend.strongSignal', 'legend.moderateSignal', 'legend.weakSignal',
    null, null, null, null, null,
    'legend.fundamentalDesc', 'legend.sentimentDesc', 'legend.technicalDesc',
    'legend.divergenceDesc', 'legend.earningsDesc', 'legend.emotionalDesc',
    'legend.cyclicalDesc', 'legend.structuralDesc', 'legend.highConfDesc', 'legend.lowConfDesc',
    'legend.oversoldDesc', 'legend.neutralDesc', 'legend.overboughtDesc',
    'legend.betterDesc', 'legend.worseDesc'
  ];
  descs.forEach((el, i) => {
    if (descKeys[i]) el.textContent = t(descKeys[i]);
  });
}
