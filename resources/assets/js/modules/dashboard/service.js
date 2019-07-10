import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as dataActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function getDashboardData() {
  return dispatch => {
    Http.post('companies/settings/gd')
      .then((res) => {
        dispatch(dataActions.getDashboardData(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}