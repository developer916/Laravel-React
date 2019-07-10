import {
  SUPER_COMPANY_ADD,
  SUPER_COMPANY_UPDATE,
  SUPER_COMPANY_REMOVE,
  SUPER_COMPANY_LIST,
  SUPER_COMPANY_GET_SETTINGS,
  SUPER_COMPANY_UPDATE_SETTINGS,
} from './action-types'

const initialState = {
  data: [],
  licenses: [],
  companySettings: {}
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case SUPER_COMPANY_ADD:
      return add(state, payload)
    case SUPER_COMPANY_UPDATE:
      return update(state, payload)
    case SUPER_COMPANY_REMOVE:
      return remove(state, payload)
    case SUPER_COMPANY_LIST:
      return list(state, payload)
    case SUPER_COMPANY_GET_SETTINGS:
      return getSettings(state, payload)
    case SUPER_COMPANY_UPDATE_SETTINGS:
      return updateSettings(state, payload)
    default:
      return state
  }
}

function add(state, payload) {
  const company = state.data.find((company) => (company.id === payload.id))

  if (!company) {
    const data = [...state.data, payload]

    return Object.assign({}, state, {
      ...state,
      data
    })
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

  return Object.assign({}, state, {
    ...state,
    data
  })
}

function remove(state, id) {
  const data = state.data.filter(obj => obj.id !== id)

  return Object.assign({}, state, {
    ...state,
    data
  })
}

function list(state, payload) {
  state = Object.assign({}, {
    ...state,
    data: payload.companies
  })

  return state
}

function getSettings(state, payload) {
  const {data} = payload

  state = Object.assign({}, {
    ...state,
    companySettings: data.settings,
    licenses: data.licenses,
  })

  return state
}

function updateSettings(state, payload) {
  const {data} = payload

  state = Object.assign({}, {
    ...state,
    companySettings: data.settings,
    licenses: data.licenses,
  })

  return state
}

export default reducer
