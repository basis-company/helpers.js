export function checkbox(v) {
  return v ? '<span class="fa fa-check" style="font-size:14px;"></span>' : '';
}

export function rating(v) {
  return v ? (Math.floor(v * 10) / 10).toFixed(1) : '';
}

const noDigitRe = /\D+/g;

export function phone(v) {
  return v ? _phone(String(v)) : '';
}

function _phone(s) {
  return s
    .replace(noDigitRe, '')
    .slice(0, 11)
    .split('')
    .map((v, i) => {
      switch (i) {
        case 0:
          return '+7 (' + (v === '7' ? '' : v);

        case 4:
          return ') ' + v;

        case 7:
        case 9:
          return '-' + v;
      }

      return v;
    })
    .join('');
}

const snilsChars = { 3: '-', 6: '-', 9: ' ' };

export function snils(v) {
  return v ? _snils(v) : '';
}

function _snils(v) {
  return v
    .replace(noDigitRe, '')
    .slice(0, 11)
    .split('')
    .map((v, i) => ((i = snilsChars[i])) ? i + v : v)
    .join('');
}
