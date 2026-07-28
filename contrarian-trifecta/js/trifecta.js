import { state } from './data.js';
import { createTable, scoreSpan, scoreClass, ratingFor, fmt, pct, escapeHtml } from './table.js';
import { applyFilters } from './filters.js';
import { t } from './i18n.js';

export function renderTrifecta() {
  const panel = document.getElementById('panel-trifecta');
  panel.innerHTML = '';

  const data = applyFilters(state.trifecta);
  if (!data.length) {
    panel.innerHTML = `<div class="empty-state"><p class="empty-state__title">${t('trifecta.empty')}</p></div>`;
    return;
  }

  const top = data.slice(0, 9);
  const rest = data.slice(9);

  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'pick-cards';
  top.forEach((stock, i) => {
    cardsContainer.appendChild(buildPickCard(stock, i + 1));
  });
  panel.appendChild(cardsContainer);

  if (rest.length) {
    const details = document.createElement('details');
    details.className = 'excluded-section';
    const summary = document.createElement('summary');
    summary.textContent = t('trifecta.remaining')(rest.length);
    details.appendChild(summary);

    const tableWrapper = document.createElement('div');
    tableWrapper.style.marginTop = '12px';

    const columns = [
      { key: '_rank', label: t('trifecta.col.rank'), title: 'Overall ranking by trifecta score', align: 'center', render: () => '' },
      { key: 'ticker', label: t('trifecta.col.ticker'), title: 'Stock ticker symbol', render: r => `<strong>${escapeHtml(r.ticker)}</strong>` },
      { key: 'company', label: t('trifecta.col.company'), title: 'Company name', render: r => escapeHtml(r.company) },
      { key: 'sector', label: t('trifecta.col.sector'), title: 'Market sector', render: r => escapeHtml(r.sector) },
      { key: 'trifecta_score', label: t('trifecta.col.trifecta'), title: 'Combined score (Fund 50% + Sent 35% + Tech 15%)', align: 'center', render: r => scoreSpan(r.trifecta_score) },
      { key: 'fundamental_score', label: t('trifecta.col.fund'), title: 'Fundamental pillar score', align: 'center', render: r => scoreSpan(r.fundamental_score) },
      { key: 'sentiment_score', label: t('trifecta.col.sent'), title: 'Sentiment pillar score', align: 'center', render: r => scoreSpan(r.sentiment_score) },
      { key: 'technical_score', label: t('trifecta.col.tech'), title: 'Technical pillar score', align: 'center', render: r => scoreSpan(r.technical_score) },
      { key: 'price', label: t('trifecta.col.price'), title: 'Current stock price', align: 'right', render: r => r.price ? `$${fmt(r.price, 2)}` : '-' },
      { key: '_rating', label: t('trifecta.col.rating'), title: 'Conviction rating', render: renderRating },
      { key: '_flags', label: t('trifecta.col.flags'), title: 'Risk flags', render: renderFlags }
    ];

    createTable(tableWrapper, { columns, data: rest });
    addRankNumbers(tableWrapper, 9);
    details.appendChild(tableWrapper);
    panel.appendChild(details);
  }
}

function buildPickCard(stock, rank) {
  const card = document.createElement('div');
  card.className = `pick-card${rank <= 3 ? ' pick-card--top3' : ''}`;

  const sent = getSentimentData(stock.ticker);
  const r = ratingFor(stock.trifecta_score);
  const trifectaClass = scoreClass(stock.trifecta_score);

  const classificationBadge = (sent.ai_classification || stock.ai_classification)
    ? `<span class="badge badge--${escapeHtml(sent.ai_classification || stock.ai_classification)}" title="AI selloff classification">${escapeHtml(sent.ai_classification || stock.ai_classification)}</span>`
    : '';
  const confidenceBadge = (sent.ai_confidence || stock.ai_confidence)
    ? `<span class="badge badge--${escapeHtml(sent.ai_confidence || stock.ai_confidence)}" title="AI confidence level">${escapeHtml(sent.ai_confidence || stock.ai_confidence)}</span>`
    : '';
  const divergenceBadge = stock.divergence_flag
    ? `<span class="badge badge--divergence" title="${t('legend.divergenceDesc')}">${t('badge.divergence')}</span>`
    : '';
  const earningsBadge = stock.pre_earnings_risk
    ? `<span class="badge badge--earnings" title="${t('legend.earningsDesc')}">${t('badge.preEarnings')}</span>`
    : '';

  const reasoning = sent.ai_reasoning || stock.ai_reasoning || '';
  const catalyst = sent.ai_catalyst || stock.ai_catalyst || '';

  card.innerHTML = `
    <span class="pick-card__rank">#${rank}</span>
    <div class="pick-card__header">
      <div>
        <span class="card__ticker">${escapeHtml(stock.ticker)}</span>
        <span class="card__company">${escapeHtml(stock.company || '')}</span>
        ${stock.price ? `<span class="card__price">$${fmt(stock.price, 2)}</span>` : ''}
      </div>
      <div class="pick-card__trifecta">
        <span class="pick-card__trifecta-score ${trifectaClass}">${stock.trifecta_score ?? '-'}</span>
        <span class="pick-card__trifecta-label">${escapeHtml(r.text)}</span>
      </div>
    </div>
    <div class="pick-card__pillars">
      ${pillarSpan(t('trifecta.pillar.fund'), stock.fundamental_score)}
      ${pillarSpan(t('trifecta.pillar.sent'), stock.sentiment_score)}
      ${pillarSpan(t('trifecta.pillar.tech'), stock.technical_score)}
    </div>
    <div class="card__badges">
      ${classificationBadge}${confidenceBadge}${divergenceBadge}${earningsBadge}
    </div>
    ${reasoning ? `<p class="card__reasoning">${escapeHtml(reasoning)}</p>` : ''}
    ${catalyst ? `<div class="card__catalyst"><strong>${t('trifecta.catalyst')}</strong> ${escapeHtml(catalyst)}</div>` : ''}
  `;

  return card;
}

function pillarSpan(label, value) {
  const cls = scoreClass(value);
  return `<div class="pick-card__pillar">
    <span class="pick-card__pillar-value ${cls}">${value ?? '-'}</span>
    <span class="pick-card__pillar-label">${label}</span>
  </div>`;
}

function getSentimentData(ticker) {
  if (!state.sentiment || !state.sentiment.length) return {};
  return state.sentiment.find(s => s.ticker === ticker) || {};
}

function renderRating(row) {
  const r = ratingFor(row.trifecta_score);
  return `<span class="rating ${r.cls}">${r.text}</span>`;
}

function renderFlags(row) {
  let html = '';
  if (row.divergence_flag) html += `<span class="badge badge--divergence" title="${t('legend.divergenceDesc')}">${t('badge.divergence')}</span> `;
  if (row.pre_earnings_risk) html += `<span class="badge badge--earnings" title="${t('legend.earningsDesc')}">${t('badge.preEarnings')}</span>`;
  return html;
}

function addRankNumbers(container, offset) {
  const rows = container.querySelectorAll('.data-table tbody tr');
  rows.forEach((tr, i) => {
    const firstTd = tr.querySelector('td');
    if (firstTd) firstTd.textContent = offset + i + 1;
  });
}
