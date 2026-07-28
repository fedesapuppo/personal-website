import { state } from './data.js';
import { createTable, scoreSpan, fmt, pct, escapeHtml } from './table.js';
import { applyFilters } from './filters.js';
import { t } from './i18n.js';

export function renderTechnical() {
  const panel = document.getElementById('panel-technical');
  panel.innerHTML = '';

  const data = applyFilters(state.technical);

  const columns = [
    { key: 'ticker', label: t('technical.col.ticker'), title: 'Stock ticker symbol', render: r => `<strong>${escapeHtml(r.ticker)}</strong>` },
    { key: 'company', label: t('technical.col.company'), title: 'Company name', render: r => escapeHtml(r.company) },
    { key: 'price', label: t('technical.col.price'), title: 'Current stock price', align: 'right', render: r => r.price ? `$${fmt(r.price, 2)}` : '-' },
    { key: 'change', label: t('technical.col.dayChange'), title: 'Daily price change percentage', align: 'right', render: r => coloredPct(r.change) },
    { key: 'sma20', label: t('technical.col.sma20'), title: 'Distance from 20-day simple moving average (negative = below SMA)', align: 'right', render: r => coloredPct(r.sma20) },
    { key: 'sma200', label: t('technical.col.sma200'), title: 'Distance from 200-day simple moving average (negative = below SMA)', align: 'right', render: r => coloredPct(r.sma200) },
    { key: 'rsi', label: t('technical.col.rsi'), title: 'Relative Strength Index: below 30 = oversold, above 70 = overbought', align: 'center', render: renderRsi },
    { key: 'high_52w', label: t('technical.col.high52w'), title: 'Distance below 52-week high (negative = below high)', align: 'right', render: r => r.high_52w != null ? `${r.high_52w.toFixed(1)}%` : '-' },
    { key: '_range', label: t('technical.col.range52w'), title: 'Current price position within 52-week high/low range', render: renderDistance },
    { key: 'volume', label: t('technical.col.volume'), title: 'Trading volume', align: 'right', render: r => r.volume ? formatVolume(r.volume) : '-' },
    { key: 'technical_score', label: t('technical.col.techScore'), title: 'Technical pillar score (0-100)', align: 'center', render: r => scoreSpan(r.technical_score) }
  ];

  createTable(panel, { columns, data });
}

function coloredPct(val) {
  if (val == null) return '-';
  const cls = val >= 0 ? 'score--high' : 'score--low';
  const sign = val >= 0 ? '+' : '';
  return `<span class="${cls}">${sign}${val.toFixed(1)}%</span>`;
}

function renderRsi(row) {
  if (row.rsi == null) return '-';
  let cls = 'rsi--neutral';
  let label = '';
  if (row.rsi < 30) { cls = 'rsi--oversold'; label = ` (${t('technical.oversold')})`; }
  else if (row.rsi > 70) { cls = 'rsi--overbought'; label = ` (${t('technical.overbought')})`; }
  return `<span class="${cls}">${row.rsi.toFixed(1)}<span class="sr-only">${label}</span></span>`;
}

function renderDistance(row) {
  if (!row.range_high_52w || !row.price) return '-';
  const pctFromLow = row.range_low_52w && row.range_high_52w !== row.range_low_52w
    ? ((row.price - row.range_low_52w) / (row.range_high_52w - row.range_low_52w) * 100)
    : 50;

  const container = document.createElement('div');
  container.className = 'distance-bar';
  container.title = `${Math.max(0, Math.min(100, pctFromLow)).toFixed(0)}% from 52W low to high`;
  container.innerHTML = `
    <span style="font-size:10px;color:var(--text-muted)">L</span>
    <div class="distance-bar__track">
      <div class="distance-bar__fill" style="width:${Math.max(0, Math.min(100, pctFromLow))}%"></div>
    </div>
    <span style="font-size:10px;color:var(--text-muted)">H</span>`;
  return container;
}

function formatVolume(vol) {
  if (vol >= 1000000) return `${(vol / 1000000).toFixed(1)}M`;
  if (vol >= 1000) return `${(vol / 1000).toFixed(0)}K`;
  return vol.toString();
}

