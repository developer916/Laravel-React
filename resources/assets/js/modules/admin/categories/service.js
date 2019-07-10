import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import * as categoryActions from './store/actions'

function transformRequest(parms) {
    return Transformer.send(parms)
}

function transformResponse(params) {
    return Transformer.fetch(params)
}


export function categoryListRequest({url = 'admin/ca'}) {
    return dispatch => {
        Http.get(url)
            .then((res) => {
                dispatch(categoryActions.list(transformResponse(res.data)))
            })
            .catch((err) => {
                // TODO: handle err
                console.error(err.response)
            })
    }
}

export function addCategory(params){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('admin/sca', transformRequest(params))
                .then((res) => {
                    const data = transformResponse(res.data);
                    dispatch(categoryActions.add(data.category))
                    return resolve(data)
                })
                .catch((err) => {
                    console.log("err", err.response);
                    // TODO: handle err
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

export  function updateCategory(params){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('admin/sca', transformRequest(params))
                .then((res) => {
                    const data = transformResponse(res.data);
                    dispatch(categoryActions.update(data.category))
                    return resolve(data)
                })
                .catch((err) => {
                    console.log("err", err.response);
                    // TODO: handle err
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

export function getCategory(id) {
    console.log('id', id);
    return dispatch => {
        Http.get(`admin/gcag?id=${id}`)
            .then((res) => {
                dispatch(categoryActions.add(transformResponse(res.data.category)))
            })
            .catch((err) => {
                // TODO: handle err
                console.error(err.response)
            })
    }
}

export function removeCategory(category) {
    return dispatch => {
        Http.post('admin/dca', transformRequest({id: category.id}))
            .then(() => {
                dispatch(categoryActions.remove(category.id))
            })
            .catch((err) => {
                // TODO: handle err
                console.error(err.response)
            })
    }
}

