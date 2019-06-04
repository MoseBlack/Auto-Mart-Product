const footerContents = document.querySelectorAll('.footer-title');
const hiddenFooter = document.querySelectorAll('.hide-footer');
const footerContainer = document.querySelector('#footer-container');
const hiddenCategory = document.querySelectorAll('.side-item');
const questionCateg = document.querySelectorAll('.question');
footerContents.forEach((footerContent) => {
    let insideContent = footerContent.nextElementSibling;
    footerContent.addEventListener('click', () => {
        if (window.innerWidth <= 321 || window.innerWidth <= 376 || window.innerWidth <= 426) {
            if (insideContent.style.display == 'none') {
                insideContent.style.display = 'block';
                footerContent.style.color = '#ffffff';
            } else {
                insideContent.style.display = 'none';
                footerContent.style.color = '#c4c4c4';
            }
            return true;
        } else {
            return false;
        }
    })
});

hiddenCategory.forEach((category) => {
    let categoryContent = category.lastElementChild;
    category.addEventListener('click', () => {
        if (categoryContent.style.display == 'none') {
            categoryContent.style.display = 'block';
        } else {
            categoryContent.style.display = 'none';
        }
    })
})

questionCateg.forEach((question) => {
    let questionContent = question.nextElementSibling;
    question.addEventListener('click', () => {
        console.log('clicked');
        if (questionContent.style.display == 'none') {
            questionContent.style.display = 'block';
        } else {
            questionContent.style.display = 'none';
        }
    })
})
