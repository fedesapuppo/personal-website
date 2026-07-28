import { t } from './i18n.js';

export function createTable(container, { columns, data, onRowClick, rowId }) {
  if (!data.length) {
    container.innerHTML = `<div class="empty-state"><p class="empty-state__title">${t('table.noData')}</p><p>${t('table.noDataSub')}</p></div>`;
    return;
  }

  const countDiv = document.createElement('div');
  countDiv.className = 'count';
  countDiv.textContent = t('table.stocks')(data.length);
  container.appendChild(countDiv);

  const table = document.createElement('table');
  table.className = 'data-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  let sortCol = null;
  let sortDir = 'desc';

  if (columns.caption) {
    const caption = document.createElement('caption');
    caption.textContent = columns.caption;
    caption.className = 'sr-only';
    table.appendChild(caption);
  }

  columns.forEach(col => {
    const th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.dataset.key = col.key;
    if (col.title) th.title = col.title;
    if (col.align) th.style.textAlign = col.align;

    const labelSpan = document.createTextNode(col.label);
    th.appendChild(labelSpan);

    th.addEventListener('click', () => {
      if (sortCol === col.key) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        sortCol = col.key;
        sortDir = 'desc';
      }
      sortAndRebuild();
    });
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  container.appendChild(table);

  function sortAndRebuild() {
    headerRow.querySelectorAll('th').forEach(th => {
      const existing = th.querySelector('.sort-arrow');
      if (existing) existing.remove();
      if (th.dataset.key === sortCol) {
        const arrow = document.createElement('span');
        arrow.className = `sort-arrow sort-arrow--${sortDir}`;
        th.appendChild(arrow);
      }
    });

    const sorted = [...data].sort((a, b) => {
      const av = a[sortCol];
      const bv = b[sortCol];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    tbody.innerHTML = '';
    sorted.forEach(row => {
      const tr = document.createElement('tr');
      const id = rowId ? rowId(row) : row.ticker;

      columns.forEach(col => {
        const td = document.createElement('td');
        if (col.align) td.style.textAlign = col.align;
        if (col.render) {
          const content = col.render(row);
          if (typeof content === 'string') td.innerHTML = content;
          else if (content instanceof Node) td.appendChild(content);
          else td.textContent = content ?? '';
        } else {
          td.textContent = row[col.key] ?? '';
        }
        tr.appendChild(td);
      });

      tbody.appendChild(tr);

      if (onRowClick) {
        tr.tabIndex = 0;
        tr.setAttribute('role', 'button');
        const handler = () => onRowClick(row, tr, id);
        tr.addEventListener('click', handler);
        tr.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handler();
          }
        });
      }
    });
  }

  sortAndRebuild();
  return table;
}

export function scoreClass(score) {
  if (score == null) return '';
  if (score >= 70) return 'score--high';
  if (score >= 50) return 'score--mid';
  return 'score--low';
}

export function scoreSpan(score) {
  if (score == null) return '';
  return `<span class="${scoreClass(score)}">${score}</span>`;
}

export function ratingFor(score) {
  if (score == null) return { text: '', cls: '' };
  if (score >= 80) return { text: t('rating.highConviction'), cls: 'rating--high-conviction' };
  if (score >= 65) return { text: t('rating.moderate'), cls: 'rating--moderate' };
  if (score >= 50) return { text: t('rating.watchList'), cls: 'rating--watch' };
  if (score >= 30) return { text: t('rating.lowConviction'), cls: 'rating--low-conviction' };
  return { text: t('rating.fearJustified'), cls: 'rating--fear-justified' };
}

export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function miniBarColor(score) {
  if (score == null) return 'green';
  if (score >= 70) return 'green';
  if (score >= 50) return 'yellow';
  return 'red';
}

export function fmt(val, decimals = 1) {
  if (val == null) return '-';
  return typeof val === 'number' ? val.toFixed(decimals) : val;
}

export function pct(val) {
  if (val == null) return '-';
  return `${val.toFixed(1)}%`;
}
