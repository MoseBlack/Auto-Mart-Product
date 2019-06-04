const buyFooter = document.querySelector('.buy-footer');
const sellFooter = document.querySelector('.sell-footer');
const aboutFooter = document.querySelector('.about-footer');

buyFooter.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:52417/UI/html/buy.html"
})

sellFooter.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:52417/UI/html/sell.html"
})

aboutFooter.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:52417/UI/html/about.html"
})
