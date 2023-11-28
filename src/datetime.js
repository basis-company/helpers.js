import isDate from 'underscore/modules/isDate.js';
import isNumber from 'underscore/modules/isNumber.js';

export const shortDayNames = [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ];

export function now() {
  var date = new Date();

  date.setMilliseconds(0);

  return date;
}

export function clearTime(date) {
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  return date;
}

/**
 * @return {Date} new Date object from 'yyyymmdd' and 'hhmmss' values
 */
export function date(ymd, hms) {
  var s = String(ymd);

  var y = s.slice(0, 4);
  var m = s.slice(4, 6);
  var d = s.slice(6, 8);

  if (!hms) {
    return new Date(y, m - 1, d);
  }

  var h = Math.floor(hms / 10000);
  var i = Math.floor(hms % 10000 / 100);
  var j = hms % 100;

  if (!ymd) {
    return new Date(1970, 0, 1, h, i, j);
  }

  return new Date(y, m - 1, d, h, i, j);
}

/**
 * @return {number} 'yyyymmdd' from [Date] object
 */
export function ymd(date) {
  return date && !isNaN(date) && _ymd(date) || null;
}

function _ymd(date) {
  return 0 +
    date.getFullYear() * 10000 +
    date.getMonth() * 100 + 100 +
    date.getDate();
}

const dateToYmd = ymd;

/**
 * @return {string} 'yyyymmddhhmmss' from 'yyyymmdd' and 'hhmmss' values or [Date] object
 */
export function ymdhms(ymd, hms) {
  if (isDate(ymd)) {
    hms =
      ymd.getHours() * 10000 +
      ymd.getMinutes() * 100 +
      ymd.getSeconds();

    ymd = dateToYmd(ymd);
  }

  if (ymd) {
    hms = hms ? zeroPad(hms, 6) : '000000';

    return ymd + hms;
  }
}

function zeroPad(hms, length) {
  var s = String(hms);

  while (s.length < length) {
    s = '0' + s;
  }

  return s;
}

const ymdToDateRe = /(\d{4})(\d{2})(\d{2})/;
const hmsToTimeRe = /(\d{1,2})(\d{2})(\d{2})/;

/**
 * @return {string} 'dd.mm.yyyy' from 'yyyymmdd'
 */
export function dmy(ymd) {
  return ymd ? String(ymd).replace(ymdToDateRe, '$3.$2.$1') : '';
}

/**
 * @return {string} 'hh:mm' from 'hhmmss'
 */
export function hm(hms) {
  return hms ? zeroPad(hms, 5).replace(hmsToTimeRe, '$1:$2') : emptyHM[1];
}

/**
 * @return {string} 'dd.mm.yyyy hh:mm:ss' from timestamp
 */
export function timestamp(ts) {
  return ts ?
    ymdhms(new Date(ts * 1000))
      .replace(ymdToDateRe, '$3.$2.$1 ')
      .replace(hmsToTimeRe, '$1:$2:$3') :
    '';
}

const genitiveMonthNames = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

export function genitiveYmd(ymd) {
  var s = String(ymd);

  var y = s.slice(0, 4);
  var m = s.slice(4, 6);
  var d = s.slice(6, 8);

  return '"' + d + '" ' + genitiveMonthNames[m - 1] + ' ' + y;
}

const emptyHM = [
  '<span style="color:gray;">0:00</span>',
  '0:00',
];

export function shift(a, tagged) {
  return a && (a[0] || a[1]) ?
    (a[0] ? hm(a[0]) : emptyHM[+!tagged]) +
    ' - ' +
    (a[1] ? hm(a[1]) : emptyHM[+!tagged]) :
    '';
}

/**
 * @return {number} ymd before 'ymd'
 */
export function prev(ymd) {
  return ymd % 100 === 1 ?
    dateToYmd(date(ymd - 1)) :
    ymd - 1;
}

/**
 * @return {number} ymd after 'ymd'
 */
export function next(ymd) {
  return ymd % 100 >= 28 ?
    dateToYmd(date(ymd + 1)) :
    +ymd + 1;
}

/**
 * Execute 'fn' for each day in range [ begin : end ]
 */
export function forEachDay(begin, end, fn) {
  var isNum = isNumber(begin);

  if (!isNum) {
    // clone
    begin = new Date(begin);
  }

  while (begin <= end) {
    fn(begin);

    if (isNum) {
      begin = next(begin);
    }
    else {
      begin.setDate(begin.getDate() + 1);
    }
  }
}
