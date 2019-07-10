import {
    SUPER_UPDATE_PASSWORD,
    SUPER_UPDATE_MAINTENANCE,
    SUPER_GET_MAINTENANCE
} from './action-types';

const initialState = {
    maintenance : 'false'
}

const reducer = (state = initialState, { type, payload = null, search = '', isSuccess = false }) => {
    switch(type) {
        case SUPER_UPDATE_PASSWORD:
            return updatePassword(state, payload);
        case SUPER_UPDATE_MAINTENANCE:
            return updateMaintenance(state, payload);
        case SUPER_GET_MAINTENANCE:
            return getMaintenance(state, payload);
        default:
            return state
    }
}

function updatePassword(state,payload){
    return Object.assign({}, state, {})
}

function updateMaintenance(state, payload){
    return Object.assign({}, state, {
        maintenance : payload.maintenance
    })
}

function getMaintenance(state, payload){
    return Object.assign({}, state, {
        maintenance: payload.maintenance
    })
}

export default reducer