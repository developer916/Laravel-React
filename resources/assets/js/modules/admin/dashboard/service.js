import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import * as dataActions from './store/actions'

function transformRequest(parms) {
    return Transformer.send(parms)
}

function transformResponse(params) {
    return Transformer.fetch(params)
}

export function dataList(params) {
    return dispatch => {
        Http.post(`admin/gs`, transformRequest(params))
            .then((res) => {
                dispatch(dataActions.list(transformResponse(res.data), params.type, params.calendarId))
            })
            .catch((err) => {
                // TODO: handle err
                console.error(err.response)
            })
    }
}


export function list() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get('admin/gca')
                .then(res => {
                    const data = Transformer.fetch(res.data);
                    dispatch(dataActions.calendarList(data.calendars));
                    return resolve(data)
                })
                .catch((err) => {
                    return reject(err);
                })
        })
    )
}

export function getDashboardData() {
    return dispatch => {
        Http.post('companies/settings/gd')
            .then((res) => {
                dispatch(dataActions.getDashboardData(transformResponse(res.data)))
            })
            .catch((err) => {
                // TODO: handle err
                console.error(err.response)
            })
    }
}