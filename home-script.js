let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        document.getElementById("header").style.top = "-100px";
    } else {
        // Scrolling up
        document.getElementById("header").style.top = "0";
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
}, false);

document.getElementById('build-button').addEventListener('click', () => {
    window.location.href = 'building.html';
});