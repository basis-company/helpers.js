import has from 'underscore/modules/_has.js';

/**
 * Check if object 'o' without properties
 */
export function empty(o) {
  for (var k in o) {
    if (has(o, k)) {
      return false;
    }
  }

  return true;
}
