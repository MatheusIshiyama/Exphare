var username = document.getElementById('username');
var tag = document.getElementById('tag');
var password = document.getElementById('password');

function validateUsername() {
    if (username.value.length < 4) {
        username.setCustomValidity('O usuário contém ao menos 4 caracteres.');
    } else {
        username.setCustomValidity('');
    }
};

function validateTag() {
    if (tag.value.length != 4) {
        tag.setCustomValidity('A tag é formada por 4 digitos.');
    } else {
        tag.setCustomValidity('');
    }
};

function validatePassword() {
    if (password.value.length < 8) {
        password.setCustomValidity('A senha contem pelo menos 8 caracteres.');
    } else {
        password.setCustomValidity('');
    }
}

username.onkeyup = validateUsername;
tag.onkeyup = validateTag;
password.onkeyup = validatePassword;

