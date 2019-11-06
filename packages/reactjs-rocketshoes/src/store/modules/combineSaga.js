import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

export default function* combineSaga() {
  return yield all([cart]);
}
