/**
 * Push 'v' into 'o.k' array
 */
export function push(o, k, v, uniq) {
  var a = o[k];

  if (a) {
    if (!uniq || a.indexOf(v) === -1) {
      a.push(v);
    }
  }
  else {
    a = o[k] = [ v ];
  }

  return a;
}
