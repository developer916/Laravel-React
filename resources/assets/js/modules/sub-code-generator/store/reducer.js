import {
  CODE_DATA,
} from './action-types'

const initialState = {
  codeData: {
    email: {
      id: 0,
      key: '0',
      type: 'container',
      style: {
        padding: '10px',
      },
      data: {},
      content: [],
    },
    website: {
      style: {
        padding: '10px',
      },
      data: {},
      content: [],
    },
    social: {
      style: {
        padding: '10px',
      },
      data: {},
      content: [],
    }
  }
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case CODE_DATA:
      return getCodeData(state, payload)
    default:
      return state
  }
}

function getCodeData(state, payload) {

}

export default reducer;