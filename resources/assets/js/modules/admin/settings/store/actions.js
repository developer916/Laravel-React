import {
    SUPER_UPDATE_PASSWORD,
    SUPER_UPDATE_MAINTENANCE,
    SUPER_GET_MAINTENANCE
} from './action-types';


export function updatePassword(payload){
    return {
        type: SUPER_UPDATE_PASSWORD,
        payload,
    }
}

export function updateMaintenance(payload){
    return {
        type: SUPER_UPDATE_MAINTENANCE,
        payload,
    }
}

export function getMaintenance(payload){
    return {
        type: SUPER_GET_MAINTENANCE,
        payload
    }
}

