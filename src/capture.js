import { nativeIsArray } from 'underscore/modules/_setup.js';
import isNumber from 'underscore/modules/isNumber.js';
import noop from 'underscore/modules/noop.js';

import { applyOwn } from './apply';
import { isObject } from './is';
import { warn } from './log';

const o = {
  context,
  toast: noop,
  upload: noop,
};

var enabled = true;
var limit   = 10;

export async function capture(mixed) {
  if (mixed && isNumber(mixed.code)) {
    // skip displayed server error
    return;
  }

  if (--limit < 0) {
    return;
  }

  try {
    var params = parse(mixed);

    o.context(params);
    trace(params);
    o.toast(params);

    if (enabled) {
      await o.upload(params);
    }
  }
  catch (e) {
    warn(e);
  }
}

applyOwn(capture, {
  init,

  enable: (level = 1) =>
    enabled = level,

  disable: () =>
    enabled = 0,
});

function init(config) {
  applyOwn(o, config);

  // listen to uncaught errors
  window.onerror = function(message, url, line, column, error) {
    capture(error || message);
  };

  // listen to uncaught promises rejections
  if (window.addEventListener) {
    addEventListener('unhandledrejection', function(event) {
      capture(event && event.reason || 'unhandledrejection');
    });
  }
}

function parse(mixed) {
  var event;

  if (mixed instanceof Error) {
    // error in promise (reject)
    // javascript based Error
    return {
      type:     mixed.name,
      message:  mixed.message,
      context:  mixed.context,
      trace:    mixed.stack,
    };
  }

  if ((event = mixed.originalEvent)) {
    // deprecated, use Error
    // window onerror
    return {
      type:     'WindowError',
      message:  event.message,
      trace:
        event.error &&
        event.error.stack,
    };
  }

  if (isObject(mixed)) {
    return applyOwn({}, mixed);
  }

  // deprecated, use Error
  return {
    type: 'SimpleError',
    message:
      nativeIsArray(mixed) ?
        mixed.join('\n') :
        mixed,
  };
}

function context(params) {
  params;
}

function trace(params) {
  var t = params.trace;

  if (!t) {
    t = new Error().stack;
  }
  else if (nativeIsArray(t)) {
    params.trace = t.join('\n');
    return;
  }

  var i = t.search(/  +at /);

  if (i > 0) {
    t = t.slice(i);
  }

  params.trace = t;
}
