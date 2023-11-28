import { slice } from 'underscore/modules/_setup.js';
import negate from 'underscore/modules/negate.js';

import { applyOwn } from './apply';
import { array } from './array';
import { isObject } from './is';

const notObject = negate(isObject);
const c = console;

const _groupCollapsed = c.groupCollapsed;
const _groupEnd = c.groupEnd;
const _debug = c.debug;
const _trace = c.trace;
const _info = c.info;
const _warn = c.warn;

var enabled;

export function raise(a) {
  'use strict';
  _warn.apply(c, a = parse(this, arguments));
  throw new Error(a.filter(notObject).join(' '));
}

export function warn() {
  'use strict';
  _warn.apply(c, parse(this, arguments));
}

export function log() {
  'use strict';

  if (enabled) {
    _info.apply(c, parse(this, arguments));
  }
}

export function debug() {
  'use strict';

  if (enabled > 1) {
    (enabled > 2 ? _trace : _debug).apply(c, parse(this, arguments));
  }
}

function parse(scope, args) {
  if (!scope && isObject(scope = args[0])) {
    args = slice.call(args, 1);
  }

  if (scope) {
    args = array(args);

    if (scope.name) {
      args.unshift(scope.name, '::');
    }
  }

  return args;
}

applyOwn(log, {
  groupCollapsed() {
    if (enabled) {
      _groupCollapsed.apply(c, arguments);
    }
  },

  groupEnd() {
    if (enabled) {
      _groupEnd.apply(c, arguments);
    }
  },

  enable: (level = 1) =>
    enabled = level,

  disable: () =>
    enabled = 0,
});
