import has from 'underscore/modules/_has.js';
import { nativeIsArray } from 'underscore/modules/_setup.js';
import isUndefined from 'underscore/modules/isUndefined.js';

/**
 * Copy own properties from objects 'overrides' to object 'o'.
 *
 * @param  {object} o destination object
 * @param  {array} [del] array of properties to delete from 'o'
 * @param  {...object} overrides source objects
 * @return {object} changed object 'o'
 */
export function applyOwn(o, del, ...overrides) {
  clean(o, del, overrides);

  return Object.assign(o, ...overrides);
}

/**
 * Copy own properties from 'defaults' to 'o' if not exists
 */
export function applyOwnIf(o, del, ...defaults) {
  clean(o, del, defaults);

  for (var source, i = 0; i < defaults.length; i++) {
    for (var k in source = defaults[i]) {
      if (!has(source, k)) {
        break;
      }

      if (isUndefined(o[k])) {
        o[k] = source[k];
      }
    }
  }

  return o;
}

function clean(o, del, rest) {
  if (nativeIsArray(del)) {
    del.forEach(k => {
      delete o[k];
    });
  }
  else if (del) {
    rest.unshift(del);
  }
}

const splitRe = /[,;\s]+/;

/**
 * Copy properties from source object to destination object.
 */
export function applyTo(dst, src, ...keys) {
  if (nativeIsArray(keys[0])) {
    keys = keys[0];
  }

  if (keys.length === 1) {
    keys = keys[0].split(splitRe);
  }

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];

    if (!isUndefined(src[k])) {
      dst[k] = src[k];
    }
  }

  return dst;
}
