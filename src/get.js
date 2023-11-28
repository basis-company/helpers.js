import deepGet from 'underscore/modules/_deepGet.js';
import { nativeIsArray } from 'underscore/modules/_setup.js';
import isUndefined from 'underscore/modules/isUndefined.js';

/**
 * Get value by 'path' from 'o'
 */
export function get(o, path, defaults) {
  if (!nativeIsArray(path)) {
    path = String(path).split('.');
  }

  var value = deepGet(o, path);

  return isUndefined(value) ? defaults : value;
}
