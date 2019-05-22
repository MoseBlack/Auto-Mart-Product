const footerContents = document.querySelectorAll('.footer-title');
const hiddenFooter = document.querySelectorAll('.hide-footer');
const footerContainer = document.querySelector('#footer-container');
for (let i = 0; i < footerContents.length; i++) {
    let insideContent = footerContents[i].nextElementSibling;
    footerContents[i].addEventListener('click', function () {
        if (window.innerWidth <= 321 || window.innerWidth <= 376 || window.innerWidth <= 426) {
            if (insideContent.style.display == 'none') {
                insideContent.style.display = 'block';
                footerContents[i].style.color = '#ffffff';
            } else {
                insideContent.style.display = 'none';
                footerContents[i].style.color = '#c4c4c4';
            }
            return true;
        } else {
            return false;
        }
    })
}
