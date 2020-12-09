var password = document.getElementById('password');
var check_password = document.getElementById('check_password');

function validatePassword() {
    if (password.value.length < 8) {
        password.setCustomValidity('A senha deve conter pelo menos 8 caracteres.');
        check_password.setCustomValidity('');
    } else if (password.value != check_password.value) {
        check_password.setCustomValidity('As senhas são diferentes!');
        password.setCustomValidity('');
    } else {
        password.setCustomValidity('');
        check_password.setCustomValidity('');
    }
};

password.onchange = validatePassword;
check_password.onkeyup = validatePassword;