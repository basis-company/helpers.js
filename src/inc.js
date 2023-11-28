/**
 * Increment value in 'o.k'
 */
export function inc(o, k, delta = 1) {
  return o[k] = o[k] ? o[k] + delta : delta;
}
