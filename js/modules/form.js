import { sendData } from './network.js';
import { Success } from './Success.js';
import { Error } from './Error.js';

const adForm = document.querySelector('.ad-form');
const btnSubmit = adForm.querySelector('.ad-form__submit');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    new FormData(evt.target),
    () => {
      btnSubmit.disabled = false;
      new Success();
    },
    () => {
      btnSubmit.disabled = false;
      new Error();
    }
  );

  btnSubmit.disabled = true;
});


