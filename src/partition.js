import { transform } from './transform';

/**
 * split array into two arrays: one's elements satisfy predicate and another's not
 */
export function partition(a, fn) {
  return transform(a, (buf, v) => {
    buf[fn(v) ? 0 : 1].push(v);
  }, [ [], [] ]);
}
