import { createStore } from 'redux';

import combineReducers from './modules/combineReducer';

const store = createStore(combineReducers);

export default store;
