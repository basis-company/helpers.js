/**
 * 'array.reduce' with break and omitted 'return' in callback
 */
export function transform(a, fn, buf = []) {
  a.some((v, i) =>
    fn(buf, v, i, a) === false
  );

  return buf;
}
