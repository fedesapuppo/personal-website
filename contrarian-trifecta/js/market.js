import { setMarket, getMarket } from './data.js';

const STORAGE_KEY = 'trifecta-market';

export function initMarketSelector(onChange) {
  const select = document.getElementById('market-selector');
  if (!select) return;

  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved && select.querySelector(`option[value="${saved}"]`)) {
    select.value = saved;
  }

  setMarket(select.value);

  select.addEventListener('change', () => {
    sessionStorage.setItem(STORAGE_KEY, select.value);
    setMarket(select.value);
    onChange(select.value);
  });
}
