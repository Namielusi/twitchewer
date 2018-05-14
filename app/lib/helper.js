/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { take, select } from 'redux-saga/effects';

export function* waitSelect(fn) {
  let result = yield select(fn);
  while (_.isNil(result)) {
    yield take();
    result = yield select(fn);
  }
  return result;
}
