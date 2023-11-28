import { log } from './log';

const buffers = {};

/**
 * Wait 'delay' after stop continuous call 'buffer' and run 'fn'.
 *
 * ex.:
 * continuous call
 *   buffer('update', item1)
 *   buffer('update', item2)
 *   buffer('update', item3)
 *   ...
 * will cause after delay
 *   scope.fn([ item1, item2, item3, ... ])
 */
export function buffer(name, item, fn, scope, delay) {
  return (
    buffers[name] ||
    (buffers[name] = creator(name, fn, scope, delay))
  )(item);
}

function creator(name, fn, scope, delay) {
  var items = {};
  var last  = 0;
  var size  = 0;

  var timer = setInterval(function() {
    if (last !== size) {
      last = size;
      return;
    }

    clearInterval(timer);

    // detach queue
    delete buffers[name];

    items = Object.values(items);

    log('process buffer', { name, size, items, fn });

    // return queue items
    fn.call(scope, items);
  }, delay || 50);

  return function(item) {
    items[item && item.id || item] = item;
    ++size;
  };
}
