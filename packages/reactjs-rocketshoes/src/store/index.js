import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import combineReducers from './modules/combineReducer';
import combineSaga from './modules/combineSaga';

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddleware)
      )
    : applyMiddleware(sagaMiddleware);

const store = createStore(combineReducers, enhancer);

sagaMiddleware.run(combineSaga);

export default store;
