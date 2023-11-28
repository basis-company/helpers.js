import { applyOwn } from './apply';
import { log } from './log';

const o = {
  cookie: 'canary',
  enabled: 'always',
  disabled: 'never',
  random,
};

var value;

/**
 * Set canary cookie for days amount.
 * Get current value if was called without parameters.
 */
export function canary(enable, days = 7) {
  var was = o.enabled === value;

  if (arguments.length === 0) {
    return was;
  }

  value = enable ? o.enabled : o.disabled;
  log(o.cookie, 'set to', '"' + value + '"', 'for', days, 'days');
  document.cookie = o.cookie + '=' + value + ';max-age=' + 60 * 60 * 24 * days;

  if (!!enable ^ was) {
    location.reload();
  }
}

applyOwn(canary, {
  init,
});

function init(config) {
  applyOwn(o, config);

  document.cookie.split('; ').some(pair =>
    pair.slice(0, 7) === o.cookie + '=' &&
    (value = pair.slice(7))
  );

  if (value) {
    log(o.cookie, '=', '"' + value + '"');
  }
  else {
    canary(o.random());
  }
}

function random() {
  return Math.random() < 0.1;
}
