import {
  SUPER_LICENSE_ADD,
  SUPER_LICENSE_UPDATE,
  SUPER_LICENSE_REMOVE,
  SUPER_LICENSE_LIST,
} from './action-types'

const initialState = {
  data: []
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case SUPER_LICENSE_ADD:
      return add(state, payload)
    case SUPER_LICENSE_UPDATE:
      return update(state, payload)
    case SUPER_LICENSE_REMOVE:
      return remove(state, payload)
    case SUPER_LICENSE_LIST:
      return list(state, payload)
    default:
      return state
  }
}

function add(state, payload) {
  const license = state.data.find((license) => (license.id === payload.id))

  if (!license) {
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
  state = Object.assign({}, { data: payload.models })

  return state
}

export default reducer
