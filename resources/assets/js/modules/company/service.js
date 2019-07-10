import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as companyActions from './store/actions'

export function registerCompanyInfo(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('companies/settings/ca', Transformer.send(credentials))
        .then(res => {
          const data = Transformer.fetch(res.data)
          dispatch(companyActions.storeCompanyAddress())
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