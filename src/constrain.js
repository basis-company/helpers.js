import isUndefined from 'underscore/modules/isUndefined.js';

/**
 * Constrain number 'n' within range [ min : max ]
 */
export function constrain(n, min, max) {
  if (n === n) {
    if (!isUndefined(max)) {
      n = n <= max ? n : max;
    }

    if (!isUndefined(min)) {
      n = n >= min ? n : min;
    }
  }

  return n;
}
