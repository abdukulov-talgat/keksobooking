const STATES = {
  'disabled': 'disabled',
  'enabled': 'enabled'
};
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');


function setState(state) {
  (state === STATES.enabled ? enablePage : disablePage)();
}


function enablePage() {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((el) => { el.disabled = false; });

  mapFilters.classList.remove('map__filters--disabled');
  Array.from(mapFilters.children).forEach((el) => {el.disabled = false;});
}

function disablePage() {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((el) => { el.disabled = true; });

  mapFilters.classList.add('map__filters--disabled');
  Array.from(mapFilters.children).forEach((el) => {el.disabled = true;});
}


export { STATES, setState };
