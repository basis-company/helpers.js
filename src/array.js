import { nativeIsArray } from 'underscore/modules/_setup.js';
import { slice } from 'underscore/modules/_setup.js';
import isArguments from 'underscore/modules/isArguments.js';
import isUndefined from 'underscore/modules/isUndefined.js';

/**
 * Convert value to array if it's not array
 */
export function array(a = []) {
  if (nativeIsArray(a)) {
    return a;
  }

  if (isUndefined(a)) {
    return [];
  }

  if (isArguments(a)) {
    return slice.call(a);
  }

  return [ a ];
}
