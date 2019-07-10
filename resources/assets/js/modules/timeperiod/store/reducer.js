import {
  DATA_CHARTS_LIST,
} from './action-types'

const initialState = {
  data: [],
  searchType: 'week',
  searchCalendarId: '',
}

const reducer = (state = initialState, { type, payload = null, searchType = 'week', searchCalendarId = '' }) => {
  switch(type) {
    case DATA_CHARTS_LIST:
      return list(state, payload, searchType, searchCalendarId)
    default:
      return state
  }
}

function list(state, payload, searchType, searchCalendarId) {
  state = Object.assign({}, state, { data: payload.data, searchType: searchType, searchCalendarId: searchCalendarId })

  return state
}

export default reducer;