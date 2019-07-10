import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as subscriberActions from './store/actions'

function transformRequest(params) {
  return Transformer.send(params)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function subscriberListRequest() {
  return dispatch => {
    Http.post('companies/gs')
      .then((res) => {
        dispatch(subscriberActions.list(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function subscriberAddRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('companies/slm', transformRequest(params))
        .then(res => {
          dispatch(subscriberActions.add(transformResponse(res.data.subscriber)))
          return resolve()
        })
        .catch((err) => {
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

export function subscriberUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('companies/ss', transformRequest(params))
        .then(res => {
          dispatch(subscriberActions.update(transformResponse(res.data.subscriber)))
          return resolve()
        })
        .catch((err) => {
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

export function subscriberEditRequest(id) {
  return dispatch => {
    Http.get(`companies/gsi?id=${id}`)
      .then((res) => {
        dispatch(subscriberActions.add(transformResponse(res.data.subscriber)))
      })
      .catch((err) => {
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
  }
}

export function subscriberRemoveRequest(subscriber) {
  return dispatch => {
    Http.post('companies/ds', transformRequest({id: subscriber.id}))
      .then(() => {
        dispatch(subscriberActions.remove(subscriber.id))
      })
      .catch((err) => {
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
  }
}