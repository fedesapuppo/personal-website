const FILES = ['trifecta', 'technical', 'fundamentals', 'sentiment', 'excluded', 'sectors'];

let currentMarket = 'us';
let currentMonth = null;
let currentLang = 'en';

export const state = {
  trifecta: [],
  technical: [],
  fundamentals: [],
  sentiment: [],
  excluded: [],
  sectors: {},
  loaded: false
};

export function setMarket(market) {
  currentMarket = market;
}

export function getMarket() {
  return currentMarket;
}

export function setDataMonth(month) {
  currentMonth = month;
}

export function setDataLang(lang) {
  currentLang = lang;
}

function buildDataPath(filename) {
  if (currentMonth) {
    return `data/${currentMarket}/${currentMonth}/${currentLang}/${filename}.json`;
  }
  return `data/${currentMarket}/${filename}.json`;
}

export async function loadData() {
  try {
    let anyLoaded = false;
    const results = await Promise.all(
      FILES.map(f =>
        fetch(buildDataPath(f))
          .then(r => {
            if (r.ok) { anyLoaded = true; return r.json(); }
            return [];
          })
          .catch(() => [])
      )
    );

    FILES.forEach((name, i) => { state[name] = results[i]; });
    state.loaded = anyLoaded;
  } catch {
    state.loaded = false;
  }
  return state;
}

export function getSectors() {
  const fromData = new Set();
  state.trifecta.forEach(s => { if (s.sector) fromData.add(s.sector); });
  state.technical.forEach(s => { if (s.sector) fromData.add(s.sector); });
  return [...fromData].sort();
}
