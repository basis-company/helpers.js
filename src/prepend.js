import { nativeIsArray } from 'underscore/modules/_setup.js';
import { array } from './array';

/**
 * Unshift array to array
 */
export function prepend(a, add) {
  for (var i = add.length - 1; i >= 0; i--) {
    a.unshift(add[i]);
  }

  return a;
}

/**
 * Unshift arguments to shallow array
 */
export function prependShallow(a) {
  a = array(a);

  for (var i = arguments.length - 1; i > 0; i--) {
    var item = arguments[i];

    if (nativeIsArray(item)) {
      for (var j = item.length - 1; j >= 0; j--) {
        prependShallow(a, item[j]);
      }
    }
    else {
      a.unshift(item);
    }
  }

  return a;
}
