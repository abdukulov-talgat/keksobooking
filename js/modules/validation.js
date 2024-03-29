import {isImg} from './util.js';

const LOCALE = 'ru';
Pristine.setLocale(LOCALE);
Pristine.addMessages(LOCALE, {
  required: 'Обязательное поле',
  email: 'Некорректный e-mail',
  number: 'Некорректное число',
  integer: 'Допустимы только целые числа',
  url: 'Некорректный URL адрес',
  tel: 'Некорректный номер телефона',
  // eslint-disable-next-line no-template-curly-in-string
  minlength: 'Минимальная длина — ${1} символов',
  // eslint-disable-next-line no-template-curly-in-string
  maxlength: 'Максимальная длина — ${1} символов',
  // eslint-disable-next-line no-template-curly-in-string
  min: 'Минимальное значения для этого поля ${1}',
  // eslint-disable-next-line no-template-curly-in-string
  max: 'Максимальное значение для этого ${1}',
  pattern: 'Не совпадает с указанным форматом',
  equals: 'Два поля не совпадают'
});
const adForm = document.querySelector('.ad-form');
const pristine = new Pristine(adForm, {
  // class of the parent element where the error/success class is added
  classTo: 'ad-form__validate',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'ad-form__validate',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'text-help'
});

const inputPrice = document.querySelector('#price');
const selectType = document.querySelector('#type');
const MAX_PRICE = 100000;
const HOUSE_TYPES = {
  //[flat,house,bungalow,palace,hotel]
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
pristine.addValidator(
  inputPrice,
  () => +inputPrice.value >= +HOUSE_TYPES[selectType.value],
  getMinPriceMsg,
);
pristine.addValidator(
  inputPrice,
  () => +inputPrice.value <= MAX_PRICE,
  `Максимальная Цена ${MAX_PRICE}`
);

const selectRoomNumber = document.querySelector('#room-number');
const selectCapacity = document.querySelector('#capacity');
pristine.addValidator(
  selectCapacity,
  () => +selectRoomNumber.value >= +selectCapacity.value,
  getCapacityMsg,
);


adForm.querySelectorAll('input[type="file"]').forEach((it) => pristine.addValidator(
  it,
  validateFileType,
  'Разрешаются только изображения в формате JPG, JPEG, PNG.'
));

function validateFileType() {
  if (this.files.length === 0) {
    return true;
  }
  return isImg(this.files[0]);
}

function getMinPriceMsg() {
  return `Минимальная цена ${selectType.value}`;
}

function getCapacityMsg(value) {
  return `Нужно как минимум ${value} комнат(ы) для ${value} гостей`;
}

function validate() {
  return pristine.validate();
}

function reset() {
  pristine.reset();
}

export { validate, reset, MAX_PRICE, HOUSE_TYPES};
