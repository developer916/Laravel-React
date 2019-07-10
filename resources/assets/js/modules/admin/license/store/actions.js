/* ============
 * Actions for the super/license module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  SUPER_LICENSE_ADD,
  SUPER_LICENSE_UPDATE,
  SUPER_LICENSE_REMOVE,
  SUPER_LICENSE_LIST,
} from './action-types';

export function add(payload) {
  return {
    type: SUPER_LICENSE_ADD,
    payload
  }
}

export function update(payload) {
  return {
    type: SUPER_LICENSE_UPDATE,
    payload
  }
}

export function remove(payload) {
  return {
    type: SUPER_LICENSE_REMOVE,
    payload
  }
}

export function list(payload) {
  return {
    type: SUPER_LICENSE_LIST,
    payload
  }
}