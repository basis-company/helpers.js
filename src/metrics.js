import { nativeIsArray } from 'underscore/modules/_setup.js';
import { transform } from './transform';

const tokensRe = /^(\w+)(?:{(.+)})? ?([\d.e+-]+)$/i;
const rnRe = /\r?\n/;

/**
 * Parse prometheus metrics
 */
export function metrics(prometheus) {
  var m, o, labels;

  if (!nativeIsArray(prometheus)) {
    prometheus = prometheus.split(rnRe);
  }

  return transform(prometheus, (a, row) => {
    if ((m = row.match(tokensRe))) {
      a.push(o = {
        metric: m[1],
        value: +m[3],
      });

      if ((labels = m[2])) {
        labels.split(',').forEach(pair => {
          var [ k, v ] = pair.split('=');

          o[k] = JSON.parse(v);
        });
      }
    }
  });
}
