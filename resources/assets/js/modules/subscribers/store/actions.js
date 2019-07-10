/* ============
 * Actions for the super/license module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  COMPANY_SUBSCRIBER_LIST,
  COMPANY_SUBSCRIBER_ADD,
  COMPANY_SUBSCRIBER_UPDATE,
  COMPANY_SUBSCRIBER_REMOVE,
} from './action-types';

export function add(payload) {
  return {
    type: COMPANY_SUBSCRIBER_ADD,
    payload
  }
}

export function update(payload) {
  return {
    type: COMPANY_SUBSCRIBER_UPDATE,
    payload
  }
}

export function remove(payload) {
  return {
    type: COMPANY_SUBSCRIBER_REMOVE,
    payload
  }
}

export function list(payload) {
  return {
    type: COMPANY_SUBSCRIBER_LIST,
    payload
  }
}