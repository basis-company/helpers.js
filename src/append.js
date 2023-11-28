import { nativeIsArray } from 'underscore/modules/_setup.js';
import { array } from './array';

/**
 * Append arguments to shallow array
 */
export function append(a) {
  a = array(a);

  for (var i = 1; i < arguments.length; i++) {
    var item = arguments[i];

    if (nativeIsArray(item)) {
      append(a, ...item);
    }
    else {
      a.push(item);
    }
  }

  return a;
}
