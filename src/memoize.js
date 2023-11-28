import has from 'underscore/modules/_has.js';
import { array } from './array';

function defaultHasher(arg) {
  if (arguments.length > 1) {
    return array(arguments);
  }

  return arg || '';
}

export function memoize(fn, hasher = defaultHasher) {
  function memoize() {
    var args = String(hasher.apply(this, arguments));

    if (!has(cache, args)) {
      cache[args] = fn.apply(this, arguments);
    }

    return cache[args];
  }

  var cache = memoize.cache = {};

  memoize.fn = fn;

  return memoize;
}
