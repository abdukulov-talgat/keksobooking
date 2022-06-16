import { sendData } from './network.js';
import { Success } from './Success.js';
import { Error } from './Error.js';
import { validate, reset, MAX_PRICE } from './validation.js';
import { isImg } from './util.js';

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

const inputPrice = adForm.querySelector('#price');
const selectType = document.querySelector('#type');
const slider = adForm.querySelector('.ad-form__slider');
noUiSlider.create(slider, {
  start: +inputPrice.value,
  connect: 'lower',
  step: 1,
  range: {
    // min: +selectType.value,    // BAD UX??
    min: 0,
    max: MAX_PRICE
  },
  format: {
    to: (value) => parseInt(value, 10),
    from: (value) => parseInt(value, 10)
  }
});

slider.noUiSlider.on('update', () => {
  inputPrice.value = slider.noUiSlider.get();
});

selectType.addEventListener('change', (evt) => {
  inputPrice.placeholder = evt.target.value;
  // slider.noUiSlider.updateOptions({      // BAD UX??? If change price without user notify
  //   range: {
  //     min: +selectType.value,
  //     max: MAX_PRICE
  //   }
  // });
});

inputPrice.addEventListener('change', (evt) => {
  slider.noUiSlider.set(evt.target.value);
});

const timeGroup = document.querySelector('.ad-form__element--time');
const inputTimeIn = timeGroup.querySelector('#timein');
const inputTimeOut = timeGroup.querySelector('#timeout');
timeGroup.addEventListener('change', (evt) => {
  inputTimeIn.selectedIndex = inputTimeOut.selectedIndex = evt.target.selectedIndex;
});


const map = new Map();
map.set(adForm.querySelector('#avatar'), adForm.querySelector('.ad-form-header__preview img'));
map.set(adForm.querySelector('#images'), adForm.querySelector('.ad-form__photo img'));

map.forEach((value, key) => key.addEventListener('change', onImgInputChanged));

function resetAll() {
  adForm.reset();
  //filter reset          фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;
  //map reset             метка адреса возвращается в исходное положение
  //ad-form address sync  значение поля адреса корректируется соответственно исходному положению метки;
  reset();
}

function onImgInputChanged(evt) {
  if (!isImg(evt.target.files[0])) {
    return;
  }

  const preview = map.get(evt.target);
  preview.src = URL.createObjectURL(evt.target.files[0]);
}


