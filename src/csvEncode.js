import isString from 'underscore/modules/isString.js';

const escapeRe = /[;"\r\n]/g;

/**
 * Encode array[][] to csv-format string
 */
export function csvEncode(a) {
  return a
    .map(encodeRow)
    .join('\n');
}

function encodeRow(row) {
  return row
    .map(v => isString(v) ? v.replace(escapeRe, ' ') : v)
    .join(';');
}
