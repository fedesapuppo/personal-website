import { setLang, getLang } from './i18n.js';

export function initLangSelector(onChange) {
  const select = document.getElementById('lang-selector');
  if (!select) return;

  select.value = getLang();

  select.addEventListener('change', () => {
    setLang(select.value);
    onChange();
  });
}
