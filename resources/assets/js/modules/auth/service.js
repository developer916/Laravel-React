import Http from '../../utils/Http'
import * as authActions from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * fetch the current logged in user
 *
 * @returns {function(*)}
 */
export function fetchUser() {
  return dispatch => {
    return Http.get('auth/user')
      .then(res => {
        const data = Transformer.fetch(res.data)
        dispatch(authActions.authUser(data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

/**
 * login user
 *
 * @param credentials
 * @returns {function(*)}
 */
export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('auth/login', credentials)
        .then(res => {
          const data = Transformer.fetch(res.data);
          dispatch(authActions.authLogin(data));
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

export function register(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('auth/register', Transformer.send(credentials))
        .then(res => {
          const data = Transformer.fetch(res.data)
          dispatch(authActions.authRegister(data.user.id))
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

export function forgotPassword(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('auth/forgot_password', Transformer.send(credentials))
        .then(res => {
          const data = Transformer.fetch(res.data)
          return resolve(data.status)
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

export function resetPassword(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('auth/set_password', Transformer.send(credentials))
        .then(res => {
          const data = Transformer.fetch(res.data)
          return resolve(data.status)
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

export function registerCompanyAddress(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('companies/settings/ca', Transformer.send(credentials))
        .then(res => {
          const data = Transformer.fetch(res.data)
          dispatch(authActions.authCompanyAddressRegister(data.company.id))
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

export function registerCompanySepa(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('companies/settings/cbi', Transformer.send(credentials))
        .then(res => {
          const data = Transformer.fetch(res.data)
          dispatch(authActions.authCompanySepaRegister(data.confirmationLink))
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

export function activeAccount(token) {

  const formData = new FormData();

  formData.append('token', token);

  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('auth/confirmation', formData)
        .then(res => {
          const data = Transformer.fetch(res.data);
          dispatch(authActions.authUserConfirmation(data.status === 'success'));
          return resolve()
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };
          dispatch(authActions.authUserConfirmation(false));
          return reject(data);
        })
    })
  )
}

/**
 * logout user
 *
 * @returns {function(*)}
 */
export function logout() {
  return dispatch => {
    return Http.delete('auth/logout')
      .then(() => {
        dispatch(authActions.authLogout())
      })
      .catch(err => {
        console.log(err)
      })
  }
}
