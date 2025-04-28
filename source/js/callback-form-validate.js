import {
  ERROR_TEXT,
  FIELD__STANDARD
} from './constants.js';

const callback = document.querySelector('.callback');
const callbackForm = callback.querySelector('.callback__form');
const callbackFields = callbackForm.querySelectorAll('.callback__item');

const setFormValidate = () => {
  const validateForm = () => {
    callbackFields.forEach((field) => {
      const input = field.querySelector('input');

      if (input.value === '') {
        input.classList.add('input-text__input--error');
        input.setCustomValidity(ERROR_TEXT.empty);
      } else if (!FIELD__STANDARD[input.id].test(input.value)) {
        input.classList.add('input-text__input--error');
        input.setCustomValidity(ERROR_TEXT[input.id]);
      } else {
        input.setCustomValidity("");
      }
    });
  };

  callbackForm.addEventListener('submit', (evt) => {
    validateForm();

    if (!callbackForm.checkValidity()) {
      evt.preventDefault();

      for (let i = 0; i < callbackFields.length; i++) {
        const field = callbackFields[i];
        const input = field.querySelector('input');

        if (!input.checkValidity()) {
          input.reportValidity();
          break
        }
      }
    }
  });

  callbackFields.forEach((field) => {
    const input = field.querySelector('input');

    input.addEventListener('focus', () => {
      if (input.classList.contains('input-text__input--error')) {
        input.reportValidity();
      }
    });

    input.addEventListener('input', () => {
      input.setCustomValidity("");
      input.classList.remove('input-text__input--error');
    });
  });
};

const formatPhone = () => {
  const phoneInput = callbackForm.querySelector('#phone');

  phoneInput.addEventListener('input', () => {
    let input = phoneInput.value.replace(/\D/g, '');
    let formattedValue = '';

    if (input.length > 0) {
      formattedValue = '+7';

      if (input.length > 1) {
        formattedValue += ' (' + input.substring(1, 4);
      }

      if (input.length >= 4) {
        formattedValue += ')-' + input.substring(4, 7);
      }

      if (input.length >= 7) {
        formattedValue += '-' + input.substring(7, 9);
      }

      if (input.length >= 9) {
        formattedValue += '-' + input.substring(9, 11);
      }

      if (input.length > 11) {
        input = input.substring(0, 11);
        formattedValue = '+7 (' + input.substring(1, 4) + ')-' + input.substring(4, 7) + '-' + input.substring(7, 9) + '-' + input.substring(9, 11);
      }
    }

    phoneInput.value = formattedValue;
  });
};

export { setFormValidate, formatPhone };
