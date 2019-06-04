const reportButton = document.querySelector('#report');
const reportModal = document.querySelector('.modal');
const reportCloseButton = document.querySelector('#close');
const sendReportButton = document.querySelector('#send-reportbutton');
const sendReportInput = document.querySelector('#send-reportinput');
const reportText = document.querySelector('#report-text');
sendReportInput.setAttribute('autofocus', 'true');
reportButton.addEventListener('click', () => {
    console.log('clicked');
    reportModal.style.display = 'block';
})

/* hide the modal */
reportCloseButton.addEventListener('click', function () {
    reportModal.style.display = 'none';
})
sendReportButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (sendReportInput.value.length == 0) {
        reportText.textContent = 'Fill in your email';
        reportText.style.color = 'red';
        setTimeout(function () {
            reportText.textContent = 'We will send instructions to your email to reset password'
            reportText.style.color = 'black';
        }, 3000);
        return;
    }
    reportText.textContent = 'Check your email for instructions';
    reportText.style.color = 'green';
    sendReportInput.value = "";
    setTimeout(function () {
        window.location.reload();
    }, 2000)
})
/*hide or close the modal when clicking outiside the modal content */
window.addEventListener('click', function (e) {
    if (e.target === reportModal) {
        reportModal.style.display = 'none';
    }
});
