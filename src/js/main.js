// Валидация формы
$(function () {
    $("#form").validate({
    // Удаляем базовое размещение ошибки
    errorPlacement: function(error, element) { },
      // Правила валидации формы 
      rules: {
        name: {
          required: true,
          lettersonly: true,
        },
        lastName: {
          required: true,
          lettersonly: true,
        },
        mail: {
            required: true,
            email: true,
        },
        password: {
            required: true,
            minlength: 8,
            passwordValid: true,
        },
        password_conf: {
          required: true,
          minlength: 8,
          equalTo: "#password",
          passwordValid: true,
      }

      },
      // Ошибка в заполнение формы
      invalidHandler: function(e, validation){
        if(e.type == "invalid-form") {
          document.querySelector('.footer-btn').classList.add('footer-btn__shake')
          setTimeout(() => {
            document.querySelector('.footer-btn').classList.remove('footer-btn__shake')
          },1000)
        }
      },
      // Запрос при заполнение формы
      submitHandler: function (form) {
        $.ajax({
          type : 'GET',
          dataType:'json',
          url: "./server-ok.json",
          success: function (data) {
            $('.success-popup').css('display', 'block');
            $('.success-popup__text').html(data['success_title'])
            let inputForm = form.querySelectorAll('input.valid');
            inputForm.forEach((e) => {
              e.value = '';
            })
          },
          error: function (error) {
            console.log(error)
          }
                
        });
        return false;
      },
      
    });
  });
// Методы для валидации полей
  jQuery.validator.addMethod(
     "lettersonly",
     function (value, element) {
       return this.optional(element) || /^[a-zA-ZА-Яа-я-ё\s]+$/i.test(value);
     },
     "Incorrect format"
   );
   jQuery.validator.addMethod(
    "passwordValid",
    function (value, element) {
      return this.optional(element) || /([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+)/i.test(value);
    },
    "Incorrect format"
  );

// Инпут-селект
const selects = document.querySelectorAll('.ui-select');

selects.forEach((select) => {
  select.addEventListener('click', (t) => {
    let list = select.querySelector('.ui-select__list'),
        label = select.querySelector('.ui-select__label');
    list.classList.toggle('ui-select__list--is-open')
    if(t.target.classList == 'ui-select__item') {
      // label.innerHTML = t.target.innerText
      label.value = t.target.innerText
    }
  })
})

