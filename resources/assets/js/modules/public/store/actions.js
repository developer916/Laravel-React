/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import {
  PUBLIC_LIST_CALENDARS,
  PUBLIC_CALENDAR_DETAIL,
  PUBLIC_EVENT_VIEW,
  PUBLIC_REGISTER_SUBSCRIBER,
  PUBLIC_GET_CATEGORIES
} from './action-types';

export function listPublicCalendars(payload) {
  return {
    type: PUBLIC_LIST_CALENDARS,
    payload
  }
}

export function publicDetailOfCalendar(payload) {
  return {
    type: PUBLIC_CALENDAR_DETAIL,
    payload
  }
}

export function publicViewEvent(payload) {
  return {
    type: PUBLIC_EVENT_VIEW,
    payload
  }
}

export function publicRegisterSubscriber(payload) {
  return {
    type: PUBLIC_REGISTER_SUBSCRIBER,
    payload
  }
}

export function publicCategories(payload){
  return {
    type: PUBLIC_GET_CATEGORIES,
    payload
  }
}