import {
  DASHBOARD_DATA,
} from './action-types'

const initialState = {
  calendars: [],
  subscribers: [],
  upcomingEvents: [],
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case DASHBOARD_DATA:
      return getDashboardData(state, payload)
    default:
      return state
  }
}

function getDashboardData(state, payload) {
  state = Object.assign({}, state, {
    calendars: payload.calendarData,
    subscribers: payload.subscribersData,
    upcomingEvents: payload.upcomingEvents,
  });

  return state
}

export default reducer;