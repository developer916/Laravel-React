import {
  COMPANY_SUBSCRIBER_LIST,
  COMPANY_SUBSCRIBER_ADD,
  COMPANY_SUBSCRIBER_UPDATE,
  COMPANY_SUBSCRIBER_REMOVE,
} from './action-types'

const initialState = {
  data: []
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case COMPANY_SUBSCRIBER_ADD:
      return add(state, payload)
    case COMPANY_SUBSCRIBER_UPDATE:
      return update(state, payload)
    case COMPANY_SUBSCRIBER_REMOVE:
      return remove(state, payload)
    case COMPANY_SUBSCRIBER_LIST:
      return list(state, payload)
    default:
      return state
  }
}

function add(state, payload) {
  const subscriber = state.data.find((subscriber) => (subscriber.id === payload.id))

  if (!subscriber) {
    const data = [...state.data, payload]

    return Object.assign({}, state, { data })
  }

  return update(state, payload)
}

function update(state, payload) {
  const data = state.data.map(obj => {
    if (obj.id === payload.id) {
      return { ...obj, ...payload }
    }
    return obj
  })

  return Object.assign({}, state, { data })
}

function remove(state, id) {
  const data = state.data.filter(obj => obj.id !== id)

  return Object.assign({}, state, { data })
}

function list(state, payload) {
  state = Object.assign({}, { data: payload.subscribers })

  return state
}

export default reducer
