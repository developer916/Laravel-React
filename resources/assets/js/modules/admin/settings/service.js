import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import * as dataActions from './store/actions'



export function updatePassword(credentials){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('admin/pc', Transformer.send(credentials))
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
export  function updateMaintenance(confirmValue){
    let sendData = {
        confirm : confirmValue
    }
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('admin/pm', Transformer.send(sendData))
                .then(res => {
                    const data = Transformer.fetch(res.data)
                    dispatch(dataActions.updateMaintenance(data))
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

export function getMaintenance(){
    return dispatch => {
        new Promise((resolve, reject) => {
            Http.post('admin/gm')
            .then((res) => {
                const data = Transformer.fetch(res.data)
                dispatch(dataActions.getMaintenance(data))
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
    }
}