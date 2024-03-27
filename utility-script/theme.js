  
const themeMap = {
  dark: 'light',
  light: 'dark'
};

// Get the first theme from the themeMap object
const defaultTheme = Object.keys(themeMap)[0];

// Check if the theme retrieved from localStorage is valid, otherwise default to the first theme
let theme = localStorage.getItem('theme');
if (!theme || !(theme in themeMap)) {
  theme = defaultTheme;
  localStorage.setItem('theme', theme);
}

const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const next = themeMap[theme];
  bodyClass.replace(theme, next);
  theme = next;
  localStorage.setItem('theme', theme);
}
