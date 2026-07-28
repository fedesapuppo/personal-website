const STORAGE_KEY = 'trifecta-month';
let currentMonth = null;
let availableMonths = [];
let currentMarketRef = 'us';

export function getMonth() {
  return currentMonth;
}

export function setMonth(month) {
  currentMonth = month;
  sessionStorage.setItem(STORAGE_KEY, month);
}

export async function initMonthSelector(market, onChange) {
  currentMarketRef = market;
  const select = document.getElementById('month-selector');
  if (!select) return;

  await loadMonths();
  updateSelectVisibility(select);

  select.addEventListener('change', () => {
    setMonth(select.value);
    onChange();
  });
}

export async function refreshMonths(market) {
  currentMarketRef = market;
  await loadMonths();
  const select = document.getElementById('month-selector');
  if (select) updateSelectVisibility(select);
}

async function loadMonths() {
  try {
    const response = await fetch(`data/${currentMarketRef}/months.json`);
    if (response.ok) {
      availableMonths = await response.json();
    } else {
      availableMonths = [];
    }
  } catch {
    availableMonths = [];
  }

  if (availableMonths.length === 0) {
    currentMonth = null;
    return;
  }

  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved && availableMonths.includes(saved)) {
    currentMonth = saved;
  } else {
    currentMonth = availableMonths[availableMonths.length - 1];
  }
}

function updateSelectVisibility(select) {
  select.innerHTML = '';
  availableMonths.forEach(month => {
    const opt = document.createElement('option');
    opt.value = month;
    opt.textContent = month;
    if (month === currentMonth) opt.selected = true;
    select.appendChild(opt);
  });

  select.style.display = availableMonths.length <= 1 ? 'none' : '';
}
