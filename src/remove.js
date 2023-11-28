/**
 * remove value from array
 * 'all' = remove duplicated value
 */
export function remove(a, v, all) {
  for (var i = 0; (i = a.indexOf(v, i)) !== -1;) {
    a.splice(i, 1);

    if (!all) {
      break;
    }
  }
}
