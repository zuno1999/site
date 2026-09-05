/**
 * Pietro Zunino - Personal Academic Website
 * Client Scripts: Theme Toggle, BibTeX Actions & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBibtexButtons();
  initCurrentYear();
});

/**
 * Dark / Light Theme Manager
 */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  // Clear any legacy auto-saved theme key
  try {
    localStorage.removeItem('pz_theme');
  } catch (e) {}

  // Explicit user preference; default to 'light'
  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem('pz_user_theme');
  } catch (e) {}

  const initialTheme = storedTheme === 'dark' ? 'dark' : 'light';
  setTheme(initialTheme, false);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme, true);
    });
  }
}

function setTheme(theme, save = false) {
  document.documentElement.setAttribute('data-theme', theme);
  if (save) {
    try {
      localStorage.setItem('pz_user_theme', theme);
    } catch (e) {}
  }

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    toggleBtn.innerHTML = theme === 'dark' 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
}

/**
 * BibTeX Expand & Copy Actions
 */
function initBibtexButtons() {
  // Toggle visibility of BibTeX blocks
  const toggleButtons = document.querySelectorAll('[data-toggle-bibtex]');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-toggle-bibtex');
      const targetBox = document.getElementById(targetId);
      if (targetBox) {
        targetBox.classList.toggle('show');
        const isShown = targetBox.classList.contains('show');
        btn.textContent = isShown ? 'Close BibTeX' : 'BibTeX';
      }
    });
  });

  // Copy BibTeX content to clipboard
  const copyButtons = document.querySelectorAll('[data-copy-bibtex]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-copy-bibtex');
      const targetBox = document.getElementById(targetId);
      if (targetBox) {
        const textToCopy = targetBox.innerText.trim();
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.color = 'var(--ink-accent)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
          }, 2000);
        } catch (err) {
          console.error('Could not copy text: ', err);
        }
      }
    });
  });
}

/**
 * Dynamic Current Year in Footer
 */
function initCurrentYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
