import { setState, STATES } from './modules/page-state.js';
import { initMap, setSimilars } from './modules/map.js';
import './modules/form.js';
import { getData } from './modules/network.js';

setState(STATES.disabled);
initMap(() => {
  console.log('map initialized');
  getData(
    (similars) => { //onSuccess
      setState(STATES.enabled);
      setSimilars(similars);
    },
    () => { //onError
      const div = document.createElement('div');
      div.style = 'position:fixed; top: 0; left: 0; right:0; background-color: #c92525; color: #fff; text-align:center; z-index: 9999';
      div.innerHTML = '<p>Не удалось загрузить данные...</p>';
      setTimeout(() => div.remove(), 3000);
      document.body.append(div);
    }
  );
});
