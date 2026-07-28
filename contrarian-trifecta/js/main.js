import { initLang, getLang } from './i18n.js';
import { loadData, getMarket, setDataMonth, setDataLang } from './data.js';
import { initTheme } from './theme.js';
import { initTabs, rerenderAll } from './tabs.js';
import { initFilters } from './filters.js';
import { initMarketSelector } from './market.js';
import { initLangSelector } from './lang.js';
import { initMonthSelector, refreshMonths, getMonth } from './month.js';
import { renderTrifecta } from './trifecta.js';
import { renderTechnical } from './technical.js';
import { renderFundamentals } from './fundamentals.js';
import { renderSentiment } from './sentiment.js';
import { renderBacktest } from './backtest.js';
import { updateStaticLabels } from './labels.js';

const tabRenderers = {
  trifecta: renderTrifecta,
  technical: renderTechnical,
  fundamentals: renderFundamentals,
  sentiment: renderSentiment,
  backtest: renderBacktest
};

function syncDataState() {
  setDataMonth(getMonth());
  setDataLang(getLang());
}

async function onMarketChange() {
  await refreshMonths(getMarket());
  syncDataState();
  updateStaticLabels();
  await loadData();
  initFilters();
  rerenderAll();
}

async function onLangChange() {
  syncDataState();
  updateStaticLabels();
  await loadData();
  initFilters();
  rerenderAll();
}

async function onMonthChange() {
  syncDataState();
  await loadData();
  initFilters();
  rerenderAll();
}

async function init() {
  initLang();
  initTheme();
  initMarketSelector(onMarketChange);
  initLangSelector(onLangChange);

  try {
    await initMonthSelector(getMarket(), onMonthChange);
  } catch (e) {
    console.warn('Month selector init failed:', e);
  }

  syncDataState();
  updateStaticLabels();
  await loadData();
  initFilters();
  initTabs(tabRenderers);
}

init().catch(err => console.error('Dashboard init failed:', err));
