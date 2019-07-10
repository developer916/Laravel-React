/* ============
 * Actions for the super/company module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  SUPER_COMPANY_ADD,
  SUPER_COMPANY_UPDATE,
  SUPER_COMPANY_REMOVE,
  SUPER_COMPANY_LIST,
  SUPER_COMPANY_GET_SETTINGS,
  SUPER_COMPANY_UPDATE_SETTINGS,
} from './action-types';

export function add(payload) {
  return {
    type: SUPER_COMPANY_ADD,
    payload
  }
}

export function update(payload) {
  return {
    type: SUPER_COMPANY_UPDATE,
    payload
  }
}

export function remove(payload) {
  return {
    type: SUPER_COMPANY_REMOVE,
    payload
  }
}

export function list(payload) {
  return {
    type: SUPER_COMPANY_LIST,
    payload
  }
}

export function getSettings(payload) {
  return {
    type: SUPER_COMPANY_GET_SETTINGS,
    payload
  }
}

export function updateSettings(payload) {
  return {
    type: SUPER_COMPANY_UPDATE_SETTINGS,
    payload
  }
}