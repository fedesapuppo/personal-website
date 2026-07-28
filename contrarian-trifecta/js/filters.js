import { rerenderAll } from './tabs.js';
import { getSectors, getMarket } from './data.js';
import { t } from './i18n.js';

export function applyFilters(data, { sectorOf } = {}) {
  const f = getFilters();
  return data.filter(s => {
    if (f.search) {
      const q = f.search.toLowerCase();
      if (!(s.ticker || '').toLowerCase().includes(q) && !(s.company || '').toLowerCase().includes(q)) return false;
    }
    if (f.sector) {
      const sector = sectorOf ? sectorOf(s) : s.sector;
      if (sector && sector !== f.sector) return false;
    }
    return true;
  });
}

function storageKey() {
  return `trifecta-filters-${getMarket()}`;
}

let filters = {
  search: '',
  sector: ''
};

export function getFilters() {
  return { ...filters };
}

let bound = false;

export function initFilters() {
  loadFromStorage();
  populateSectors();
  if (!bound) {
    bindGlobalControls();
    bound = true;
  } else {
    document.getElementById('global-search').value = filters.search;
    document.getElementById('sector-filter').value = filters.sector;
  }
}

function loadFromStorage() {
  filters = { search: '', sector: '' };
  try {
    const saved = sessionStorage.getItem(storageKey());
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.search != null) filters.search = parsed.search;
      if (parsed.sector != null) filters.sector = parsed.sector;
    }
  } catch { /* ignore */ }
}

function save() {
  sessionStorage.setItem(storageKey(), JSON.stringify(filters));
}

function populateSectors() {
  const select = document.getElementById('sector-filter');
  select.innerHTML = `<option value="">${t('toolbar.allSectors')}</option>`;
  getSectors().forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    if (s === filters.sector) opt.selected = true;
    select.appendChild(opt);
  });
}

function bindGlobalControls() {
  const search = document.getElementById('global-search');
  search.value = filters.search;
  let searchTimeout;
  search.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filters.search = search.value;
      save();
      rerenderAll();
    }, 200);
  });

  const sector = document.getElementById('sector-filter');
  sector.value = filters.sector;
  sector.addEventListener('change', () => {
    filters.sector = sector.value;
    save();
    rerenderAll();
  });
}
