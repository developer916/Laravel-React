import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import * as licenseActions from './store/actions'

function transformRequest(params) {
  return Transformer.send(params)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function licenseListRequest() {
  return dispatch => {
    Http.post('admin/lm')
      .then((res) => {
        dispatch(licenseActions.list(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function licenseAddRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('admin/slm', transformRequest(params))
        .then(res => {
          dispatch(licenseActions.add(transformResponse(res.data.license)))
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

export function licenseUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('admin/slm', transformRequest(params))
        .then(res => {
          dispatch(licenseActions.update(transformResponse(res.data.license)))
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

export function licenseEditRequest(id) {
  return dispatch => {
    Http.get(`admin/glm?id=${id}`)
      .then((res) => {
        dispatch(licenseActions.add(transformResponse(res.data.license)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function licenseRemoveRequest(license) {
  return dispatch => {
    Http.post('admin/dlm', transformRequest({id: license.id}))
      .then(() => {
        dispatch(licenseActions.remove(license.id))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}