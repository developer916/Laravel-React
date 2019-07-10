import Http from '../../../../../utils/Http'
import Transformer from '../../../../../utils/Transformer'
import * as lhtmlEditorActions from './store/actions'

function transformRequest(params) {
  return Transformer.send(params)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function loadEditor(params) {
  return dispatch => {
    Http.post('companies/gh', transformRequest(params))
      .then((res) => {
        dispatch(lhtmlEditorActions.lhtmlLoad(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.message)
      })
  }
}

// export function getEditor(params) {
//   return dispatch => {
//     Http.post('dashboard/gh', transformRequest(params))
//       .then((res) => {
//         dispatch(lhtmlEditorActions.lhtmlLoad(transformResponse(res.data)))
//         // return resolve(res.data)
//       })
//       .catch((err) => {
//         // TODO: handle err
//         console.error(err.message)
//       })
//   }
// }


export function getEditor(params){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('dashboard/gh', Transformer.send(params))
                .then(res => {
                    const data = Transformer.fetch(res.data)
                    dispatch(lhtmlEditorActions.lhtmlLoad(data))
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
                            errors: err.response.data.errors,
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

export function storeEditor(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('companies/sh', transformRequest(params))
        .then(res => {
          dispatch(lhtmlEditorActions.lhtmlStore(transformResponse(res.data)))
          return resolve(res.data)
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