
let theme;
let themeToggleBtn = document.getElementById('themeBtn');

// update copyright current year when site loaded
document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('copyright-year').innerHTML = new Date().getFullYear();


   theme = window.localStorage.getItem('theme');

   /* checks if the theme stored in localStorage is dark
   if yes apply the dark theme to the body */
   if (theme === 'dark') {
      document.body.classList.add('dark');
      themeToggleBtn.src = 'assets/sun.png';
      themeToggleBtn.alt = 'switch to light theme';
   }

}, false);

function toggleTheme() {
   document.body.classList.toggle('dark');
   if (theme === 'dark') {
      window.localStorage.setItem("theme", "light");
      themeToggleBtn.src = 'assets/sun.png';
      themeToggleBtn.alt = 'switch to light theme';
   } else {
      window.localStorage.setItem("theme", "dark");
      themeToggleBtn.src = 'assets/moon.png';
      themeToggleBtn.alt = 'switch to dark theme';
   }
}

function reset_page() {
   location.reload(); // reload page
}