import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import * as companyActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function companyAddRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('admin/sc', transformRequest(params))
        .then(res => {
          const data = transformResponse(res.data);
          dispatch(companyActions.add(transformResponse(res.data.company)))
          return resolve(data);
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

export function companyUpdateStatusRequest(params){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('admin/dac', transformRequest(params))
                .then(res => {
                    dispatch(companyActions.update(transformResponse(res.data.company)))
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
export function companyUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('admin/sc', transformRequest(params))
        .then(res => {
         const data = transformResponse(res.data);
          dispatch(companyActions.update(transformResponse(res.data.company)))
          return resolve(data)
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

export function companyRemoveRequest(company) {
  return dispatch => {
    Http.post('admin/dc', transformRequest({id: company.id}))
      .then(() => {
        dispatch(companyActions.remove(company.id))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function companyListRequest({url = 'admin/cl'}) {
  return dispatch => {
    Http.get(url)
      .then((res) => {
        dispatch(companyActions.list(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function companyEditRequest(id) {
  return dispatch => {
    Http.get(`admin/gc?id=${id}`)
      .then((res) => {
        dispatch(companyActions.add(transformResponse(res.data.company)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function companyFetchRequest(slug) {
  return dispatch => {
    Http.get(`articles/published/${slug}`)
      .then((res) => {
        dispatch(companyActions.add(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err)
      })
  }
}

export function companySettingsGetRequest(id) {
  return dispatch => {
    Http.get(`admin/gcs?id=${id}`)
      .then((res) => {
        dispatch(companyActions.getSettings(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err)
      })
  }
}

export function companySettingsUpdateRequest(params) {
  return dispatch => {
    Http.post('admin/ucs', transformRequest(params))
      .then((res) => {
        dispatch(companyActions.updateSettings(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err)
      })
  }
}