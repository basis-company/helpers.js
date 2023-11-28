import { applyOwn, applyOwnIf } from './apply';
import { array } from './array';

/**
 * Clone objects to a new one
 * @see applyOwn
 */
export function copyOwn(/* o, del, ...overrides */) {
  return applyOwn.apply(this, copyFirst(arguments));
}

export function copyOwnIf(/* o, del, ...defaults */) {
  return applyOwnIf.apply(this, copyFirst(arguments));
}

function copyFirst(args) {
  args = array(args);
  args[0] = applyOwn({}, args[0]);  // copy own

  return args;
}
