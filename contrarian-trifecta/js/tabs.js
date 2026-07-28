import { state } from './data.js';
import { t } from './i18n.js';

const TABS = ['trifecta', 'technical', 'fundamentals', 'sentiment', 'backtest'];

function getTabDescription(name) {
  const techCount = state.technical?.length || 0;
  const excludedCount = state.excluded?.length || 0;
  const sentimentCount = state.sentiment?.length || 0;
  const trifectaCount = state.trifecta?.length || 0;
  const fundCount = trifectaCount;

  const generators = {
    trifecta: () => t('tabDesc.trifecta')(trifectaCount),
    technical: () => t('tabDesc.technical')(techCount),
    fundamentals: () => t('tabDesc.fundamentals')(fundCount, excludedCount),
    sentiment: () => t('tabDesc.sentiment')(sentimentCount),
    backtest: () => t('tabDesc.backtest')
  };
  return generators[name]?.() || '';
}

let renderers = {};
let rendered = new Set();

export function initTabs(tabRenderers) {
  renderers = tabRenderers;
  document.querySelectorAll('.tabs__tab').forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      const name = tab.dataset.tab;
      switchTab(name);
      history.replaceState(null, '', `#${name}`);
    });
  });

  document.querySelectorAll('.tabs__tab').forEach(tab => {
    tab.addEventListener('keydown', e => {
      const tabs = [...document.querySelectorAll('.tabs__tab')];
      const idx = tabs.indexOf(tab);
      let target = null;
      if (e.key === 'ArrowRight') target = tabs[(idx + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') target = tabs[(idx - 1 + tabs.length) % tabs.length];
      if (target) {
        e.preventDefault();
        target.focus();
        target.click();
      }
    });
  });

  const initial = location.hash.slice(1);
  switchTab(TABS.includes(initial) ? initial : 'trifecta');
}

export function switchTab(name) {
  document.querySelectorAll('.tabs__tab').forEach(t => {
    const isActive = t.dataset.tab === name;
    t.setAttribute('aria-selected', isActive);
    t.tabIndex = isActive ? 0 : -1;
  });

  document.querySelectorAll('.tab-panel').forEach(p => {
    p.hidden = p.id !== `panel-${name}`;
  });

  updateDescription(name);

  if (!rendered.has(name) && renderers[name]) {
    renderers[name]();
    rendered.add(name);
  }
}

function updateDescription(name) {
  let desc = document.getElementById('tab-description');
  if (!desc) {
    desc = document.createElement('div');
    desc.id = 'tab-description';
    desc.className = 'tab-description';
    const tabs = document.querySelector('.tabs');
    tabs.parentNode.insertBefore(desc, tabs.nextSibling);
  }
  desc.innerHTML = getTabDescription(name);
}

export function rerenderTab(name) {
  rendered.delete(name);
  const panel = document.getElementById(`panel-${name}`);
  if (panel) panel.innerHTML = '';
  if (!panel?.hidden && renderers[name]) {
    renderers[name]();
    rendered.add(name);
  }
}

export function rerenderAll() {
  rendered.clear();
  TABS.forEach(name => {
    const panel = document.getElementById(`panel-${name}`);
    if (panel) panel.innerHTML = '';
  });
  const active = TABS.find(n => !document.getElementById(`panel-${n}`)?.hidden);
  if (active) {
    updateDescription(active);
    if (renderers[active]) {
      renderers[active]();
      rendered.add(active);
    }
  }
}
