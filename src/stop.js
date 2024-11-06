import noop from 'underscore/modules/noop.js';

export function stop() {
  return new Promise(noop);
}
