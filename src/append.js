import { nativeIsArray } from 'underscore/modules/_setup.js';
import { array } from './array';

/**
 * Append array to array
 */
export function append(a, add) {
  for (var i = 0; i < add.length; i++) {
    a.push(add[i]);
  }

  return a;
}

/**
 * Append arguments to shallow array
 */
export function appendShallow(a) {
  a = array(a);

  for (var i = 1; i < arguments.length; i++) {
    var item = arguments[i];

    if (nativeIsArray(item)) {
      for (var j = 0; j < item.length; j++) {
        appendShallow(a, item[j]);
      }
    }
    else {
      a.push(item);
    }
  }

  return a;
}
