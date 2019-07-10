/* ============
 * Actions for the events module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  EVENTS_DATA,
  EVENT_ADD,
  EVENT_GET,
  EVENT_UPDATE,
} from './action-types';

export function getEventsData(payload, search, isSuccess) {
  return {
    type: EVENTS_DATA,
    payload,
    search,
    isSuccess
  }
}

export function addEvent(payload, isSuccess) {
  return {
    type: EVENT_ADD,
    payload,
    isSuccess,
  }
}

export function getEvent(payload) {
  return {
    type: EVENT_GET,
    payload,
  }
}