import {debounce} from './util.js';
import { renderSimilars, similars } from './map.js';

const filters = document.querySelector('.map__filters');
const houseType = filters.querySelector('#housing-type');
const housePrice = filters.querySelector('#housing-price');
const houseRooms = filters.querySelector('#housing-rooms');
const houseGuests = filters.querySelector('#housing-guests');
const hasWifi = filters.querySelector('#filter-wifi');
const hasDishwasher = filters.querySelector('#filter-dishwasher');
const hasParking = filters.querySelector('#filter-parking');
const hasWashing = filters.querySelector('#filter-washer');
const hasElevator = filters.querySelector('#filter-elevator');
const hasConditioner = filters.querySelector('#filter-conditioner');


const onFiltersChangedThrottled = debounce(onFiltersChanged);

filters.addEventListener('change', () => {
  onFiltersChangedThrottled();
});

filters.addEventListener('reset', () => {
  onFiltersChangedThrottled();
});

function onFiltersChanged() {
  let items = similars.slice();
  if (houseType.value !== 'any') {
    items = items.filter((it) => it.offer.type === houseType.value);
  }
  switch (housePrice.value) {
    case 'low':
      items = items.filter((it) => +it.offer.price < 10000);  //10 000
      break;
    case 'middle':
      items = items.filter((it) => (+it.offer.price >= 10000) && (+it.offer.price <= 50000)); //10 000 - 50 000₽
      break;
    case 'high':
      items = items.filter((it) => +it.offer.price > 50000); //50 000
      break;
  }
  switch (houseRooms.value) {
    case '1':
      items = items.filter((it) => +it.offer.rooms === 1);
      break;
    case '2':
      items = items.filter((it) => +it.offer.rooms === 2);
      break;
    case '3':
      items = items.filter((it) => +it.offer.rooms === 3);
      break;
  }
  switch (houseGuests.value) {
    case '1':
      items = items.filter((it) => +it.offer.guests === 1);
      break;
    case '2':
      items = items.filter((it) => +it.offer.guests === 2);
      break;
    case '0':
      items = items.filter((it) => +it.offer.guests === 0);
      break;
  }

  if (hasWifi.checked) {
    items = items.filter((it) => it.offer.features && it.offer.features.indexOf('wifi') !== -1);
  }
  if (hasDishwasher.checked) {
    items = items.filter((it) => it.offer.features && it.offer.features.indexOf('dishwasher') !== -1);
  }
  if (hasParking.checked) {
    items = items.filter((it) => it.offer.features && it.offer.features.indexOf('parking') !== -1);
  }
  if (hasWashing.checked) {
    items = items.filter((it) => it.offer.features && it.offer.features.indexOf('washer') !== -1);
  }
  if (hasElevator.checked) {
    items = items.filter((it) => it.offer.features && it.offer.features.indexOf('elevator') !== -1);
  }
  if (hasConditioner.checked) {
    items = items.filter((it) => it.offer.features && it.offer.features.indexOf('conditioner') !== -1);
  }

  renderSimilars(items);
}

