import Event from '../Event'

import {
  EVENTS_DATA,
  EVENT_ADD,
  EVENT_GET,
  EVENT_UPDATE,
} from './action-types'

const initialState = {
  upcomingEvents: [],
  pastEvents: [],
  search: '',
  event: new Event({}),
  isSuccess: false,
  eventReminders: []
}

const reducer = (state = initialState, { type, payload = null, search = '', isSuccess = false }) => {
  switch(type) {
    case EVENTS_DATA:
      return getEventsData(state, payload, search, isSuccess)
    case EVENT_ADD:
      return addEvent(state, payload, isSuccess)
    case EVENT_GET:
      return getEvent(state, payload, isSuccess)
    default:
      return state
  }
}

function getEventsData(state, payload, search, isSuccess) {
  state = Object.assign({}, state, {
    upcomingEvents: payload.upcomingData,
    pastEvents: payload.pastData,
    search: search,
    isSuccess: isSuccess
  });

  return state
}

function addEvent(state, payload, isSuccess) {

  return Object.assign({}, state, {
    isSuccess: isSuccess
  })
}

function getEvent(state, payload) {


  return Object.assign({}, state, { event: payload.data, eventReminders : payload.eventReminders})
}

export default reducer;