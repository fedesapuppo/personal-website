const STORAGE_KEY = 'trifecta-theme';

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) document.documentElement.dataset.theme = saved;
  updateLabel(document.documentElement.dataset.theme || 'light');

  document.getElementById('theme-toggle').addEventListener('click', toggle);

  const legendToggle = document.getElementById('legend-toggle');
  const legendPanel = document.getElementById('legend-panel');
  const legendClose = document.getElementById('legend-close');

  legendToggle.addEventListener('click', () => {
    legendPanel.hidden = !legendPanel.hidden;
  });

  legendClose.addEventListener('click', () => {
    legendPanel.hidden = true;
  });

  legendPanel.addEventListener('keydown', e => {
    if (e.key === 'Escape') legendPanel.hidden = true;
  });
}

function toggle() {
  const current = document.documentElement.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem(STORAGE_KEY, next);
  updateLabel(next);
}

function updateLabel(theme) {
  const label = document.getElementById('theme-label');
  if (label) label.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
}
