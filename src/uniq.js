export function uniq(a) {
  return a.filter((v, i) => a.indexOf(v) === i);
}
