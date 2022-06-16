import { sendData } from './network.js';
import { Success } from './Success.js';
import { Error } from './Error.js';
import { validate, reset } from './validation.js';

const adForm = document.querySelector('.ad-form');
const btnSubmit = adForm.querySelector('.ad-form__submit');
const btnReset = adForm.querySelector('.ad-form__reset');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!validate()) {
    return;
  }

  sendData(
    new FormData(evt.target),
    () => {
      btnSubmit.disabled = false;
      resetAll();
      new Success();
    },
    () => {
      btnSubmit.disabled = false;
      new Error();
    }
  );

  btnSubmit.disabled = true;
});

btnReset.addEventListener('click', () => {
  resetAll();
});

function resetAll() {
  adForm.reset();
  //filter reset          фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;
  //map reset             метка адреса возвращается в исходное положение
  //ad-form address sync  значение поля адреса корректируется соответственно исходному положению метки;
  reset();
}


const inputPrice = adForm.querySelector('#price');
document.querySelector('#type').addEventListener('change', (evt) => {
  inputPrice.placeholder = evt.target.value;
});


const timeGroup =  document.querySelector('.ad-form__element--time');
const inputTimeIn = timeGroup.querySelector('#timein');
const inputTimeOut = timeGroup.querySelector('#timeout');
timeGroup.addEventListener('change', (evt) => {
  inputTimeIn.selectedIndex = inputTimeOut.selectedIndex = evt.target.selectedIndex;
});

