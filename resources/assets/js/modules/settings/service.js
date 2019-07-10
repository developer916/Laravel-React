import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as dataActions from './store/actions'


function transformRequest(parms) {
    return Transformer.send(parms)
}

function transformResponse(params) {
    return Transformer.fetch(params)
}

export function getCompanyData(params) {
    return dispatch => {
        Http.post('companies/settings/gc', transformRequest(params))
            .then((res) => {
                dispatch(dataActions.getCompany(transformResponse(res.data)))
            })
            .catch((err) => {
                // TODO: handle err
                console.error(err.response)
            })
    }
}

export function updateCompanyAddress(credentials){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('companies/settings/ca', Transformer.send(credentials))
                .then(res => {
                    const data = transformResponse(res.data)
                    dispatch(dataActions.updateCompanyAddress(data, true))
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

export function updateCompanySepa(credentials){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('companies/settings/cbi', Transformer.send(credentials))
                .then(res => {
                    const data = Transformer.fetch(res.data)
                    dispatch(dataActions.updateCompanySepa(data))
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

export function updateCompanySMTP(smtp){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('companies/settings/csi', Transformer.send(smtp))
                .then(res => {
                    const data = Transformer.fetch(res.data)
                    dispatch(dataActions.updateCompanySMTP(data))
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

export function updatePassword(credentials){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('companies/settings/pc', Transformer.send(credentials))
                .then(res => {
                    const data = Transformer.fetch(res.data)
                    dispatch(dataActions.updatePassword(data))
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