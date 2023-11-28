const delims = /(;|\r?\n|\r|^)/       .source;  // ; \r \n
const quoted = /"([^"]*(?:""[^"]*)*)"/.source;  // "value"
const simple = /([^;\r\n]*)/          .source;  // value
const dqRe   = /""/g;

/**
 * Decode csv-string 's' to array[][]
 */
export function csvDecode(s) {
  var empty = () =>
    a[i].length === 1 && a[i][0].trim() === '' ||
    a[i].length === 0;

  var csvRe = new RegExp(delims + '(?:' + quoted + '|' + simple + ')', 'gi');
  var a = [ [] ];
  var i = 0;
  var m, pos;

  if (s) {
    while ((m = csvRe.exec(s))) {
      if (pos === m.index) {
        throw new Error('Некорректный формат csv');
      }

      pos = m.index;

      if (m[1].length && m[1] !== ';') {
        if (empty()) {
          a[i].pop();  // skip empty row
        }
        else {
          a.push([]);
          i++;
        }
      }

      a[i].push(m[2] ? m[2].replace(dqRe, '"') : m[3]);
    }
  }

  if (empty()) {
    a.pop();  // skip last empty row
  }

  return a;
}
