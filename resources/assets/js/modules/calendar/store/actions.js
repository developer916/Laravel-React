/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import {
  CALENDAR_LIST,
  LOAD_CALENDAR_LIST,
  ADD_NEW_CALENDAR,
  DELETE_CALENDAR,
  SELECTED_CALENDAR,
  UPDATE_CALENDAR,
  CURRENT_CALENDAR_EVENTS,
  ADD_NEW_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_EVENT_SHORTLINK,
  GET_CALENDAR
} from './action-types';

export function calendarList(calendarList) {
  return {
    type: CALENDAR_LIST,
    calendarList
  }
}

export function loadCalendarList() {
  return {
    type: LOAD_CALENDAR_LIST
  }
}

export function addNewCalendar(calendar) {
  return {
    type: ADD_NEW_CALENDAR,
    calendar
  }
}

export function addNewEvent(event) {
  return {
    type: ADD_NEW_EVENT,
    event
  }
}

export function deleteEvent(eventId) {
  return {
    type: DELETE_EVENT,
    eventId
  }
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    event
  }
}


export function deleteCalendar(calendar) {
  return {
    type: DELETE_CALENDAR,
    calendar
  }
}

export function setCurrentCalendar(calendar) {
  return {
    type: SELECTED_CALENDAR,
    calendar
  }
}

export function setCurrentCalendarEvents(payload) {
  return {
    type: CURRENT_CALENDAR_EVENTS,
    payload
  }
}

export function updateCalendar(calendar) {
  return {
    type: UPDATE_CALENDAR,
    calendar
  }
}

export function getEventShortLink(payload) {
  return {
    type: GET_EVENT_SHORTLINK,
    payload
  }
}

export function getCalendar(payload){
  return {
    type: GET_CALENDAR,
    payload
  }
}