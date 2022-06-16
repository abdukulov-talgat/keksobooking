import { setState, STATES } from './modules/page-state.js';
import { initMap } from './modules/map.js';
import './modules/form.js';

setState(STATES.disabled);
initMap(() => setState(STATES.enabled));
