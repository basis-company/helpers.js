import { nativeCreate } from 'underscore/modules/_setup.js';
import { applyOwn } from './apply';

/**
 * Create a new object, using an existing object as the prototype
 * and copy own properties from 'overrides' to created object
 */
export function create(proto, ...overrides) {
  return applyOwn(nativeCreate(proto), ...overrides);
}
