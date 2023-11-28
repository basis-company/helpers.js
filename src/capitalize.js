export function capitalize(s) {
  if (s) {
    s = s[0].toUpperCase() + s.slice(1);
  }

  return s;
}
