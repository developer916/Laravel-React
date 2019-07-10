import {
  PUBLIC_LIST_CALENDARS,
  PUBLIC_CALENDAR_DETAIL,
  PUBLIC_EVENT_VIEW,
  PUBLIC_REGISTER_SUBSCRIBER,
  PUBLIC_GET_CATEGORIES
} from './action-types';

const initialState = {
  calendars: [],
  company: {},
  calendar: {},
  events: [],
  categories: [],
  event: {},
  maintenance: 'false'
};

const reducer = (state = initialState, {type, payload=null}) => {
  switch (type) {
    case PUBLIC_LIST_CALENDARS:
      return listPublicCalendars(state, payload);
    case PUBLIC_CALENDAR_DETAIL:
      return publicDetailOfCalendar(state, payload);
    case PUBLIC_EVENT_VIEW:
      return publicViewEvent(state, payload);
    case PUBLIC_REGISTER_SUBSCRIBER:
      return publicRegisterSubscriber(state, payload);
    case PUBLIC_GET_CATEGORIES:
      return publicGetCategories(state, payload);
    default:
      return state;
  }
};

function listPublicCalendars(state, payload) {
  let maintenance = payload.maintenance;
  localStorage.setItem("maintenance", maintenance);
  state = Object.assign({}, state, {
    calendars: payload.data,
    maintenance: maintenance
  })
  return state;
}

function publicDetailOfCalendar(state, payload) {
  state = Object.assign({}, state, {
    company: payload.company,
    calendar: payload.calendar,
    events: payload.events
  })

  return state;
}

function publicViewEvent(state, payload) {
  state = Object.assign({}, state, {
    event: payload
  })

  return state;
}

function publicRegisterSubscriber(state, payload) {
  return state;
}

function publicGetCategories(state, payload){
    state = Object.assign({}, state, {
        categories: payload.categories,
    })
    return state;
}

export default reducer;
