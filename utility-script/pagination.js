
let pages = Array.from(document.getElementsByClassName('content'));
let navItems = Array.from(document.getElementsByClassName('nav-item'));

function paginate(pg) {
    // Hide all pages 
    pages.forEach(function(page) {
        page.style.display = 'none';
    });

    // Show the selected page
    let selectedPage = document.getElementById(pg + '-page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }


    // remove active-nav class from all navItems
    navItems.forEach(function(element) {
        element.classList.remove('active-nav');
    });

    // add active-nav class for selected page
    let selectedNav = document.getElementById(pg + '-nav');
    if (selectedNav) {
        selectedNav.classList.add('active-nav');
    }
}