/**
 * Create and return namespace
 * @return {object} o = { k1: { k2: {} } }
 */
export function ns(o /* , k1, k2, ... */) {
  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i];

    o = o[arg] || (o[arg] = {});
  }

  return o;
}
