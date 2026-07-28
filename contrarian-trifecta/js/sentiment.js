import { state } from './data.js';
import { createTable, scoreSpan, fmt, pct, escapeHtml } from './table.js';
import { applyFilters } from './filters.js';
import { t } from './i18n.js';

export function renderSentiment() {
  const panel = document.getElementById('panel-sentiment');
  panel.innerHTML = '';

  const data = applyFilters(state.sentiment, {
    sectorOf: s => state.trifecta.find(t => t.ticker === s.ticker)?.sector
  });

  if (!data.length) {
    panel.innerHTML = `<div class="empty-state"><p class="empty-state__title">${t('sentiment.empty')}</p><p>${t('sentiment.emptySub')}</p></div>`;
    return;
  }

  const enriched = data.map(stock => {
    const priceData = getStockPrice(stock.ticker);
    return { ...stock, price: priceData?.price ?? null, change: priceData?.change ?? null };
  });

  const columns = [
    { key: 'ticker', label: t('sentiment.col.ticker'), title: 'Stock ticker symbol', render: r => `<strong>${escapeHtml(r.ticker)}</strong>` },
    { key: 'company', label: t('sentiment.col.company'), title: 'Company name', render: r => escapeHtml(r.company) },
    { key: 'price', label: t('sentiment.col.price'), title: 'Current stock price', align: 'right', render: r => r.price ? `$${fmt(r.price, 2)}` : '-' },
    { key: 'sentiment_score', label: t('sentiment.col.sentiment'), title: 'AI sentiment pillar score (0-100)', align: 'center', render: r => scoreSpan(r.sentiment_score) },
    { key: 'ai_classification', label: t('sentiment.col.classification'), title: 'AI selloff classification', render: renderClassification },
    { key: 'ai_confidence', label: t('sentiment.col.confidence'), title: 'AI confidence in analysis', render: renderConfidence },
    { key: 'ai_reasoning', label: t('sentiment.col.reasoning'), title: 'AI analysis summary', render: r => `<span class="cell--wrap">${escapeHtml(r.ai_reasoning) || '-'}</span>` },
    { key: 'ai_catalyst', label: t('sentiment.col.catalyst'), title: 'Potential recovery catalyst', render: r => `<span class="cell--wrap">${escapeHtml(r.ai_catalyst) || '-'}</span>` },
    { key: 'short_float', label: t('sentiment.col.shortFloat'), title: 'Short interest as percentage of float', align: 'right', render: r => pct(r.short_float) },
    { key: 'analyst_target_price', label: t('sentiment.col.target'), title: 'Analyst consensus target price', align: 'right', render: r => r.analyst_target_price ? `$${fmt(r.analyst_target_price, 2)}` : '-' }
  ];

  createTable(panel, { columns, data: enriched });

  if (state.excluded.length) {
    panel.appendChild(buildExcludedSection());
  }
}

function renderClassification(row) {
  if (!row.ai_classification) return '-';
  return `<span class="badge badge--${escapeHtml(row.ai_classification)}">${escapeHtml(row.ai_classification)}</span>`;
}

function renderConfidence(row) {
  if (!row.ai_confidence) return '-';
  return `<span class="badge badge--${escapeHtml(row.ai_confidence)}">${escapeHtml(row.ai_confidence)}</span>`;
}

function getStockPrice(ticker) {
  const trifectaMatch = state.trifecta.find(t => t.ticker === ticker);
  if (trifectaMatch && trifectaMatch.price != null) return trifectaMatch;
  const techMatch = state.technical.find(t => t.ticker === ticker);
  if (techMatch && techMatch.price != null) return techMatch;
  return null;
}

function buildExcludedSection() {
  const details = document.createElement('details');
  details.className = 'excluded-section';

  const summary = document.createElement('summary');
  summary.textContent = t('sentiment.excluded')(state.excluded.length);
  details.appendChild(summary);

  const list = document.createElement('div');
  list.className = 'excluded-list';

  state.excluded.forEach(stock => {
    const item = document.createElement('div');
    item.className = 'excluded-item';
    item.innerHTML = `
      <span><strong>${escapeHtml(stock.ticker)}</strong> ${escapeHtml(stock.company)}</span>
      <span class="excluded-reasons">${escapeHtml((stock.exclusion_reasons || []).join(', '))}</span>`;
    list.appendChild(item);
  });

  details.appendChild(list);
  return details;
}

