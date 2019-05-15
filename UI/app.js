// UI components memory references
const signUpLink = document.querySelector('#signup-link');
const confirmLabel = document.querySelector('#confirm-password');
const confirmInput = document.querySelector('#new-password');
const signinButton = document.querySelector('#signin-button');
const signupButton = document.querySelector('#signup-button');
const signTitle = document.querySelector('#signin-title');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const notAMemberText = document.querySelector('#not-member');
const resetPassword = document.querySelector('#reset-password');
const signinLink = document.querySelector('#signin-link');
const inputsArray = document.querySelectorAll('.form-container form > input');
const resetPasswordModal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.close');
const sendResetButton = document.querySelector('#send-resetbutton');
const modalText = document.querySelector('#modal-text');
const sendResetInput = document.querySelector('#send-resetinput');
const userProfile = document.querySelector('#user-profile');
const loginLink = document.querySelector('#login-link');
const aboutLink = document.querySelector('#about-link');
const activeLink = document.querySelector('#active-link');
const sellLink = document.querySelector('#sell-link');
emailInput.setAttribute('autofocus', 'true');
signUpLink.addEventListener('click', function (e) {
    e.preventDefault();
    confirmLabel.style.display = 'inline';
    confirmInput.style.display = 'inline';
    signupButton.style.display = 'inline';
    signinButton.style.display = 'none';
    signinLink.style.display = 'inline';
    notAMemberText.style.display = 'none';
    signUpLink.style.display = 'none';
    resetPassword.style.display = 'none';
    signTitle.textContent = 'Join Auto Mart and get the best deals';
})
signinLink.addEventListener('click', function (e) {
    e.preventDefault();
    notAMemberText.style.display = 'inline';
    signUpLink.style.display = 'inline';
    signinLink.style.display = 'none';
    signinButton.style.display = 'inline';
    signupButton.style.display = 'none';
    resetPassword.style.display = 'inline';
    signTitle.textContent = 'Sign in to continue to Auto Mart';
})
// function to display error message for empty field(s)
function emptyField() {
    inputsArray.forEach(function (input) {
        if (input.value.length == 0) {
            input.style.border = '1px solid red';
        }
        signTitle.textContent = 'Please fill in all required fields';
        signTitle.style.color = '#e74c3c';
        setTimeout(function () {
            window.location.reload();
        }, 3000)
    })

}
signinButton.addEventListener('click', function (e) {
    e.preventDefault();
    // "test@gmail.com" && "admin123" are set to be test credentials...
    if ((emailInput.value != "test@gmail.com") || (passwordInput.value != "admin123")) {
        if (emailInput.value.length == 0 || passwordInput.value.length == 0) {
            emptyField();
            return;
        }
        signTitle.textContent = 'Wrong email or password!!!';
        signTitle.style.color = '#e74c3c';
        emailInput.value = '';
        passwordInput.value = '';
        setTimeout(function () {
            signTitle.textContent = "Please use email : test@gmail.com && password : admin123";
            setTimeout(function () {
                signTitle.textContent = '';
                window.location.reload();
            }, 6000);

        }, 3000);

    } else {
        signTitle.textContent = `Welcome ${emailInput.value}`;
        signTitle.style.color = '#2ecc71';
        loginLink.style.display = 'none';
        aboutLink.style.color = '#3B698D';
        sellLink.style.color = '#3B698D';
        activeLink.style.color = '#3B698D';
        userProfile.style.display = 'inline';
        setTimeout(function () {
            signTitle.textContent = '';
            emailInput.value = '';
            passwordInput.value = '';
            window.location.reload();
        }, 6000);
    }
})
signupButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (emailInput.value.length == 0 || passwordInput.value.length == 0 || confirmInput.value == 0) {
        emptyField();
        return;
    }
     else if (passwordInput.value.length < 8 ) {
        signTitle.textContent = 'Password too short';
        signTitle.style.color = '#e74c3c';
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }
    else if (passwordInput.value.indexOf(' ') !== -1 ) {
        signTitle.textContent = 'Spaces are not allowed';
        signTitle.style.color = '#e74c3c';
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }
    // check if passwords match before submitting data.. 
    else if (passwordInput.value.localeCompare(confirmInput.value) == 0 && passwordInput.value.length > 7) {
        signTitle.textContent = `Thanks for signing up`;
        signTitle.style.color = '#2ecc71';
        setTimeout(function () {
            window.location.reload();
        }, 2000)

    } else {
        signTitle.textContent = 'Passwords must match';
        signTitle.style.color = '#e74c3c';
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }

})
/* show the madal */
resetPassword.addEventListener('click', function () {
    resetPasswordModal.style.display = 'block';
})
/* hide the modal */
modalCloseButton.addEventListener('click', function () {
    resetPasswordModal.style.display = 'none';
})
sendResetButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (sendResetInput.value.length == 0) {
        modalText.textContent = 'Fill in your email';
        modalText.style.color = 'red';
        setTimeout(function () {
            modalText.textContent = 'We will send instructions to your email to reset password'
            modalText.style.color = 'black';
        }, 3000);
        return;
    }
    modalText.textContent = 'Check your email for instructions';
    modalText.style.color = 'green';
    sendResetInput.value = "";
    setTimeout(function () {
        window.location.reload();
    }, 2000)
})
/*hide or close the modal when clicking outiside the modal content */
window.addEventListener('click', function (e) {
    if (e.target == resetPasswordModal) {
        resetPasswordModal.style.display = 'none';
    }
})
