import { t } from './i18n.js';

const PICKS = [
  {
    ticker: 'GGAL', company: 'Grupo Financiero Galicia',
    price_jan2020: 13, price_may2026: 46,
    return_pct: 254, vs_benchmark: 132,
    trifecta_score: 85,
    fundamental_score: 85, sentiment_score: 90, technical_score: 75,
    classification: 'emotional'
  },
  {
    ticker: 'BMA', company: 'Banco Macro',
    price_jan2020: 30, price_may2026: 69,
    return_pct: 130, vs_benchmark: 8,
    trifecta_score: 83,
    fundamental_score: 82, sentiment_score: 90, technical_score: 70,
    classification: 'emotional'
  },
  {
    ticker: 'PAM', company: 'Pampa Energia',
    price_jan2020: 20, price_may2026: 82,
    return_pct: 310, vs_benchmark: 188,
    trifecta_score: 81,
    fundamental_score: 78, sentiment_score: 88, technical_score: 72,
    classification: 'emotional'
  }
];

const PORTFOLIO_RETURN = 231;
const BENCHMARK_RETURN = 122;
const OUTPERFORMANCE = 109;

export function renderBacktest() {
  const panel = document.getElementById('panel-backtest');
  panel.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'backtest';

  container.innerHTML = `
    ${renderHeader()}
    ${renderContext()}
    ${renderMethodology()}
    ${renderPickCards()}
    ${renderResults()}
    ${renderDisclaimer()}
  `;

  panel.appendChild(container);
}

function renderHeader() {
  return `
    <div class="backtest__header">
      <h2 class="backtest__title">${t('backtest.title')}</h2>
      <p class="backtest__period">${t('backtest.period')}</p>
      <div class="backtest__benchmark-bar">
        <span class="backtest__benchmark-label">${t('backtest.benchmarkLabel')}</span>
        <span class="backtest__benchmark-value score--mid">+${BENCHMARK_RETURN}%</span>
        <span class="backtest__vs">vs</span>
        <span class="backtest__benchmark-label">${t('backtest.portfolioLabel')}</span>
        <span class="backtest__benchmark-value score--high">+${PORTFOLIO_RETURN}%</span>
      </div>
      <p class="backtest__outperformance">${t('backtest.outperformance')}: <strong class="score--high">+${OUTPERFORMANCE} ${t('backtest.pp')}</strong></p>
    </div>
  `;
}

function renderContext() {
  const points = t('backtest.contextPoints') || [];
  return `
    <div class="backtest__section">
      <h3 class="backtest__section-title">${t('backtest.contextTitle')}</h3>
      <ul class="backtest__list">
        ${Array.isArray(points) ? points.map(p => `<li>${p}</li>`).join('') : ''}
      </ul>
    </div>
  `;
}

function renderMethodology() {
  const steps = t('backtest.methodSteps') || [];
  return `
    <div class="backtest__section">
      <h3 class="backtest__section-title">${t('backtest.methodTitle')}</h3>
      <ol class="backtest__list backtest__list--numbered">
        ${Array.isArray(steps) ? steps.map(s => `<li>${s}</li>`).join('') : ''}
      </ol>
    </div>
  `;
}

function renderPickCards() {
  return `
    <div class="backtest__section">
      <h3 class="backtest__section-title">${t('backtest.picksTitle')}</h3>
      <div class="backtest__picks">
        ${PICKS.map(renderPick).join('')}
      </div>
    </div>
  `;
}

function renderPick(pick) {
  const vsClass = pick.vs_benchmark > 0 ? 'score--high' : 'score--low';
  const vsSign = pick.vs_benchmark > 0 ? '+' : '';
  const reasonings = t('backtest.reasonings') || {};

  return `
    <div class="backtest__pick-card">
      <div class="backtest__pick-header">
        <div>
          <span class="backtest__pick-ticker">${pick.ticker}</span>
          <span class="backtest__pick-company">${pick.company}</span>
        </div>
        <div class="backtest__pick-score">
          <span class="backtest__pick-trifecta score--high">${pick.trifecta_score}</span>
          <span class="backtest__pick-label">Trifecta</span>
        </div>
      </div>

      <div class="backtest__pick-pillars">
        <div class="backtest__pillar">
          <span class="backtest__pillar-value">${pick.fundamental_score}</span>
          <span class="backtest__pillar-label">Fund</span>
        </div>
        <div class="backtest__pillar">
          <span class="backtest__pillar-value">${pick.sentiment_score}</span>
          <span class="backtest__pillar-label">Sent</span>
        </div>
        <div class="backtest__pillar">
          <span class="backtest__pillar-value">${pick.technical_score}</span>
          <span class="backtest__pillar-label">Tech</span>
        </div>
      </div>

      <div class="backtest__pick-performance">
        <div class="backtest__price-row">
          <span>${t('backtest.jan2020')}: <strong>$${pick.price_jan2020}</strong></span>
          <span class="backtest__arrow">&rarr;</span>
          <span>${t('backtest.may2026')}: <strong>$${pick.price_may2026}</strong></span>
        </div>
        <div class="backtest__return-row">
          <span class="backtest__return score--high">+${pick.return_pct}%</span>
          <span class="${vsClass}">${vsSign}${pick.vs_benchmark}pp vs S&P 500</span>
        </div>
      </div>

      <p class="backtest__pick-reasoning">${reasonings[pick.ticker]}</p>
      <span class="badge badge--${pick.classification}">${pick.classification}</span>
    </div>
  `;
}

function renderResults() {
  return `
    <div class="backtest__section backtest__results">
      <h3 class="backtest__section-title">${t('backtest.resultsTitle')}</h3>
      <div class="backtest__results-grid">
        <div class="backtest__result-card">
          <span class="backtest__result-label">${t('backtest.portfolioLabel')}</span>
          <span class="backtest__result-value score--high">+${PORTFOLIO_RETURN}%</span>
          <span class="backtest__result-sub">${t('backtest.resultsSub1')}</span>
        </div>
        <div class="backtest__result-card">
          <span class="backtest__result-label">S&P 500</span>
          <span class="backtest__result-value score--mid">+${BENCHMARK_RETURN}%</span>
          <span class="backtest__result-sub">${t('backtest.resultsSub2')}</span>
        </div>
        <div class="backtest__result-card backtest__result-card--highlight">
          <span class="backtest__result-label">${t('backtest.alphaLabel')}</span>
          <span class="backtest__result-value score--high">+${OUTPERFORMANCE}pp</span>
          <span class="backtest__result-sub">${t('backtest.resultsSub3')}</span>
        </div>
      </div>
      <p class="backtest__note">${t('backtest.resultsNote')}</p>
    </div>
  `;
}

function renderDisclaimer() {
  return `
    <div class="backtest__disclaimer">
      <p><strong>${t('backtest.disclaimerLabel')}:</strong> ${t('backtest.disclaimerText')}</p>
      <p><strong>${t('backtest.whyLabel')}:</strong> ${t('backtest.whyText')}</p>
    </div>
  `;
}
