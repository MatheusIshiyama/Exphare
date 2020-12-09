var password = document.getElementById('password');
var check_password = document.getElementById('check_password');

function validatePassword() {
    if (password.value.length < 9) {
        password.setCustomValidity('A senha deve conter pelo menos 8 caracteres.');
    } else if (password.value != check_password.value) {
        check_password.setCustomValidity('As senhas são diferentes!');
    }
};

password.onchange = validatePassword;
check_password.onchange = validatePassword;