import $ from 'jquery';

window.addEventListener('DOMContentLoaded', () => {

    let inputName = document.getElementById('name-surname'),
        inputEmail = document.getElementById('email'),
        inputPhone = document.getElementById('phone'),
        message = document.getElementById('message'),
        sendBtn = document.getElementById('send-btn'),
        modalWindow = document.getElementById('modal-window');

    let elements = [inputName, inputEmail, inputPhone, message],
        placeholders = [
            'Сидоров Александр',
            'Sidorov@yandex.ru',
            '+7 (999)-328-14-20',
            'Свой проект по созданию универсальной инфраструктуры строительства'
        ];

    sendBtn.onclick = () => {
        checkForm();
    };

    document.forms[0].onkeydown = function (event) {
        let e = event || window.event;
        if (e.keyCode == 13) {
            e.preventDefault();
            checkForm();
        }
    };

    inputName.onblur = () => {
        clearStyle(inputName, placeholders[0]);
    };
    inputEmail.onblur = () => {
        clearStyle(inputEmail, placeholders[1]);
    };
    inputPhone.onblur = () => {
        clearStyle(inputPhone, placeholders[2]);
    };

    function checkForm() {
        let nameValue = inputName.value,
            emailValue = inputEmail.value,
            phoneValue = inputPhone.value;
            
        if (nameValue.length == 0) {
            inputAlert(inputName, "*Введите имя");
            return false;

        }else if (emailValue.length == 0) {
            inputAlert(inputEmail, "*Введите e-mail");
            return false;

        } else {
            clearStyle(inputEmail);
            clearStyle(inputName);
        }

        let at = emailValue.indexOf("@"),
            dot = emailValue.indexOf("."),
            
            regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            validPhone = regPhone.test(phoneValue);

        if (at < 1 || dot < 1) {
            inputEmail.value = '';
            inputAlert(inputEmail, "*Введите корректный e-mail");
            return false;

        } else if (phoneValue.length > 1 && !validPhone) {
            inputAlert(inputPhone, "*Введите корректный телефон");
            return false;
                
            
        } else {
            sendForm();

           for (let i = 0; i < elements.length; i++) {
               elements[i].value = '';
               clearStyle(elements[i], placeholders[i]);
           }

            modalWindow.className = 'modal-window fade';
            setTimeout(function () {
                modalWindow.className = 'modal-window';
            }, 2500);
        }
    }

    function inputAlert(elem, placeholder) {
        elem.placeholder = placeholder;
        elem.style.border = '2px solid #ff0202';
        elem.style.padding = '0 10px 0 10px';
        elem.style.borderRadius = '25px';
    }

    function clearStyle(elem, placeholder) {
        elem.placeholder = placeholder;
        elem.style.border = 'none';
        elem.style.borderRadius = '0';
        elem.style.borderBottom = '2px solid #4d4d4d';
    }

    function sendForm() {

        let email = $('input[name = email]').val(),
            name = $('input[name = name]').val(),
            phone = $('input[name = phone]').val(),
            message = $('textarea[name = message]').val();

        let data = {
            'user_email': email,
            'user_name': name,
            'user_phone': phone, 
            'user_message': message
            };

        $.post('sendmail.php', data,
            function (answer) {
                console.log(answer.text);
            }, 'json');
    }
});