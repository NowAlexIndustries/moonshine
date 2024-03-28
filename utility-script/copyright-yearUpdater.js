
// should be at server side, but with GitHub Pages you can only host static websites

// update copyright current year when site loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
 }, false);