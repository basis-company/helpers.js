/**
 * @return {string} remain time from 'seconds'
 */
export function remain(seconds) {
  if (seconds <= 0) {
    return '';
  }

  var result = [];

  for (var k in remainMap) {
    var div  = remainMap[k];
    var val  = seconds % div;

    seconds -= val;
    seconds /= div;

    result.unshift(val + ' ' + k);
  }

  result.unshift(seconds + ' дн');

  return result
    .filter(v => v[0] !== '0')
    .filter((v, i) => i < 2)
    .join(' ');
}

const remainMap = {
  /* eslint-disable quote-props */
  'сек': 60,
  'мин': 60,
  'час': 24,
  /* eslint-enable quote-props */
};
