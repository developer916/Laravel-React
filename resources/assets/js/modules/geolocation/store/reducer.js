import {
  DATA_LIST,
} from './action-types'

const initialState = {
  data: [],
  maxValue: 1,
  searchType: '',
  searchCalendarId: '',
}

const reducer = (state = initialState, { type, payload = null, searchType = '', searchCalendarId = '' }) => {
  switch(type) {
    case DATA_LIST:
      return list(state, payload, searchType, searchCalendarId)
    default:
      return state
  }
}

function list(state, payload, searchType, searchCalendarId) {
  state = Object.assign({}, state, { data: payload.data, maxValue: payload.max[0]["maxValue"], searchType: searchType, searchCalendarId: searchCalendarId })

  return state
}

export default reducer;