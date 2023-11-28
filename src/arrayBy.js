import isFunction from 'underscore/modules/isFunction.js';

import { inc } from './inc';
import { push } from './push';
import { transform } from './transform';

/**
 * Count values by key
 */
export function countBy(a, k) {
  return iteratee(a, k, one, inc);
}

function one() {
  return 1;
}

/**
 * Group array values by key
 */
export function groupBy(a, k, v) {
  return iteratee(a, k, v, push);
}

/**
 * Array mapper
 */
export function indexBy(a, k, v) {
  return iteratee(a, k, v, index);
}

function index(o, k, v) {
  o[k] = v;
}

function iteratee(a, k, v, fn) {
  var kFn = isFunction(k) ? k : (item) => k ? item[k] : item;
  var vFn = isFunction(v) ? v : (item) => v ? item[v] : item;

  return transform(a, (o, item) => {
    fn(o, kFn(item), vFn(item));
  }, {});
}
