/* ============
 * Actions for the Subscription Code Generator module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  LHTML_LOAD,
  LHTML_STORE,
  LHTML_ADD_ROW,
  LHTML_SELECT,
  LHTML_REMOVE,
  LHTML_ADD_BUTTON,
  LHTML_UPDATE_ATTRIBUTE,
  LHTML_CHANGE_TYPE
} from './action-types';

export function lhtmlLoad(payload) {
  return {
    type: LHTML_LOAD,
    payload
  }
}

export function lhtmlStore(payload) {
  return {
    type: LHTML_STORE,
    payload
  }
}

export function lhtmlAddRow(payload) {
  return {
    type: LHTML_ADD_ROW,
    payload
  }
}

export function lhtmlSelect(payload) {
  return {
    type: LHTML_SELECT,
    payload
  }
}

export function lhtmlRemove(payload) {
  return {
    type: LHTML_REMOVE,
    payload
  }
}

export function lhtmlUpdateAttribute(payload) {
  return {
    type: LHTML_UPDATE_ATTRIBUTE,
    payload
  }
}

export function lhtmlAddButton(payload) {
  return {
    type: LHTML_ADD_BUTTON,
    payload
  }
}

export function lhtmlChangeType(payload) {
  return {
    type: LHTML_CHANGE_TYPE,
    payload
  }
}