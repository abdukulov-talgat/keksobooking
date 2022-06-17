import { Point } from './Point.js';


let similars = [];
const SIMILAR_RENDER_COUNT = 10;
const SIMILAR_ICON = L.icon({
  iconUrl: '../../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const HOUSE_TYPE_VALUE = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец'
};
const similarsLayer = L.layerGroup();
const DEFAULT_POINT = new Point(35.68560395424242, 139.75280135505645);
const DEFAULT_MARKER = L.marker(DEFAULT_POINT, {
  icon: L.icon({
    iconUrl: '../../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52]
  }),
  draggable: true,
});
const inputAddress = document.querySelector('#address');
const map = L.map(document.querySelector('#map-canvas'));

function initMap(cb) {
  inputAddress.value = DEFAULT_POINT.toPrimitive();
  map.on('load', () => cb());
  // map.whenReady(cb);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(map);
  map.setView(DEFAULT_POINT, 13);

  DEFAULT_MARKER.addTo(map);
  DEFAULT_MARKER.on('move', () => {
    const { lat, lng } = DEFAULT_MARKER.getLatLng();
    const pos = new Point(lat, lng);
    inputAddress.value = pos.toPrimitive();
  });
}

function reset() {
  map.setView(DEFAULT_POINT, 13);
  DEFAULT_MARKER.setLatLng(DEFAULT_POINT);
  DEFAULT_MARKER.setLatLng(DEFAULT_POINT);
}


function setSimilars(items) {
  similars = items;
  renderSimilars(similars);
}

function renderSimilars(items) {
  similarsLayer.clearLayers();
  const count = Math.min(items.length, SIMILAR_RENDER_COUNT);

  for(let i = 0; i < count; i++){
    const marker = L.marker(items[i].location,{
      icon: SIMILAR_ICON,
    });
    marker.bindPopup(renderBaloon(items[i]));
    similarsLayer.addLayer(marker);
  }
  similarsLayer.addTo(map);
}


function renderBaloon(item){
  const card = document.createElement('article');
  card.classList.add('popup');

  if(item.author && item.author.avatar) {
    card.insertAdjacentHTML('beforeend',`<img src="${item.author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">`);
  }
  card.insertAdjacentHTML('beforeend', (`
    <h3 class="popup__title">${item.offer.title}</h3>
    <p class="popup__text popup__text--address">${item.offer.address}</p>
    <p class="popup__text popup__text--price">${item.offer.price} <span>₽/ночь</span></p>
    <h4 class="popup__type">${HOUSE_TYPE_VALUE[item.offer.type]}</h4>
    <p class="popup__text popup__text--capacity">${item.offer.rooms} комнаты для ${item.offer.guests} гостей</p>
    <p class="popup__text popup__text--time">Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}</p>
  `));
  if(item.offer.features){
    let offers = '<ul class="popup__features">\n';
    offers += item.offer.features.reduce((prev, curr) => `${prev}\t<li class="popup__feature popup__feature--${curr}"></li>\n`, '');
    offers += '</ul>';
    card.insertAdjacentHTML('beforeend',offers);
  }
  if(item.offer.description){
    card.insertAdjacentHTML('beforeend', `<p class="popup__description">${item.offer.description}</p>`);
  }
  if(item.offer.photos && item.offer.photos.length > 0){
    card.insertAdjacentHTML('beforeend', (`
    <div class="popup__photos">
      <img src="${item.offer.photos[0]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">
    </div>
    `));
  }

  return card;
}


export { initMap, DEFAULT_POINT, reset, setSimilars, renderSimilars, similars };
