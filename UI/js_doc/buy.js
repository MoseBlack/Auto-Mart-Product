const sideMenu = document.querySelector('#left-sidemenu');
const ham = document.querySelector('#side-menu');
const close = document.querySelector('#close-icon');
const hamIcon = document.querySelector('#ham-icon');
const createAd = document.querySelector('#create-ad');

hamIcon.addEventListener('click', function () {
    sideMenu.style.display = 'inline';
    close.style.display = 'inline';
    hamIcon.style.display = 'none';
})
close.addEventListener('click', function (e) {
    close.style.display = 'none';
    hamIcon.style.display = 'inline';
    window.location.reload();
    e.preventDefault();
});
createAd.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:52417/UI/html/sell.html"
})
