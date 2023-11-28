import noop from 'underscore/modules/noop.js';
import now from 'underscore/modules/now.js';

import { constrain } from './constrain';
import { log, warn } from './log';

const min   = 200;
const max   = 5000;
const time  = 30;

/**
 * Execute 'fn' 'total' times splitted by chunk range [ min : max ]
 */
export function portion(name, total, aborted, fn) {
  if (!fn) {
    fn = aborted;
    aborted = noop;
  }

  var size  = min;
  var i     = 0;
  var stop  = i + size;
  var iter;

  var next = (start) => {
    var elapsed  = now() - start;
    var overtime = elapsed > 100;
    var logger   = overtime ? warn : log;

    logger(this, name, 'processed', stop, 'elapsed', elapsed, 'with size', size);

    size = Math.floor(size * time / elapsed);
    size = constrain(size, min, max);
    stop = i + size;

    setTimeout(iter, 1);
  };

  return new Promise(resolve => {
    (iter = () => {
      if (aborted()) {
        warn(this, name, 'aborted');
        return;
      }

      var start = now();

      for (; i < total; i++) {
        if (i === stop) {
          next(start);
          return;
        }

        fn.call(this, i);
      }

      resolve();
    })();
  });
}
