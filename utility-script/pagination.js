function paginate(pageId) {
    // Hide all pages
    let pages = Array.from(document.getElementsByClassName('content'));
    pages.forEach(function(page) {
        page.style.display = 'none';
    });

    // Show the selected page
    let selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}