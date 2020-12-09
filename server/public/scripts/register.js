var password = document.getElementById('password');
var check_password = document.getElementById('check_password');

function validatePassword() {
    if (password.value != check_password.value) {
        check_password.setCustomValidity('As senhas sao diferentes');
    }
};

password.onchange = validatePassword;
check_password.onchange = validatePassword;