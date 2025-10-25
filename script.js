// === 🌗 Gestion du mode sombre / clair ===
const themeToggle = document.getElementById('theme-toggle');

// Récupère le thème enregistré (si existant)
const userTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Applique le thème initial
if (userTheme) {
  document.documentElement.setAttribute('data-theme', userTheme);
} else if (systemPrefersDark) {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

// Fonction pour mettre à jour l’icône du bouton
function updateIcon() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}
updateIcon();

// Gestion du clic sur le bouton
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateIcon();
});

// Option bonus : mise à jour automatique si le système change de thème
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newTheme = e.matches ? 'dark' : 'light';
  if (!localStorage.getItem('theme')) { // seulement si l’utilisateur n’a pas forcé un thème
    document.documentElement.setAttribute('data-theme', newTheme);
    updateIcon();
  }
});
