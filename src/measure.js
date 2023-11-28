import now from 'underscore/modules/now.js';

import { applyOwn } from './apply';
import { debug, log, warn } from './log';

var enabled;

/**
 * Measure fn work time
 */
export function measure(name, fn, scope, args) {
  var start    = now();

  debug('measure:', name);

  var result   = fn.apply(scope, args || []);

  var elapsed  = now() - start;
  var overtime = elapsed > 100;
  var logger   = overtime ? warn : log;

  if (overtime || enabled) {
    logger('measure:', name, '(' + elapsed + 'ms)');
  }

  return result;
}

applyOwn(measure, {
  enable: (level = 1) =>
    enabled = level,

  disable: () =>
    enabled = 0,
});
