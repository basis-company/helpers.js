export function seconds(begin, end) {
  if (!begin || isNaN(begin) || !end || isNaN(end)) {
    return null;
  }

  var btzo = begin.getTimezoneOffset();
  var etzo = end  .getTimezoneOffset();

  return (end - begin) / 1000 - (etzo - btzo) * 60;
}

export function days(begin, end) {
  return seconds(begin, end) / 86400;
}
