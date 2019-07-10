import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as dataActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function dataList(params) {
  return dispatch => {
    Http.post(`analyse/gm`, transformRequest(params))
      .then((res) => {
        dispatch(dataActions.list(transformResponse(res.data), params.type, params.calendarId))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}