import { nativeIsArray } from 'underscore/modules/_setup.js';
import { array } from './array';

/**
 * Unshift arguments to shallow array
 */
export function prepend(a) {
  a = array(a);

  for (var i = arguments.length - 1; i > 0; i--) {
    var item = arguments[i];

    if (nativeIsArray(item)) {
      prepend(a, ...item);
    }
    else {
      a.unshift(item);
    }
  }

  return a;
}
