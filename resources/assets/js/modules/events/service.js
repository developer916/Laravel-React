import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as dataActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function getEventsData(params) {
  return dispatch => {
    Http.post('companies/settings/ge', transformRequest(params))
      .then((res) => {
        dispatch(dataActions.getEventsData(transformResponse(res.data), params.search, false))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function getEvent(params) {
  return dispatch => {
    Http.post('event/ge', transformRequest(params))
      .then((res) => {
        dispatch(dataActions.getEvent(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function addEvent(event) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('event/se', transformRequest(event))
        .then((res) => {
          const data = transformResponse(res.data);
          if(data.status == "success"){
              dispatch(dataActions.addEvent(data, true))
          }
          return resolve(data)
        })
        .catch((err) => {
          // TODO: handle err
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
      })
  )
}