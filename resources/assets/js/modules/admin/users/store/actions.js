import {
    SUPER_USER_UPDATE,
    SUPER_GET_USERS,
    SUPER_ADD_USER,
    SUPER_GET_USER,
    SUPER_DELETE_USER,
    SUPER_UPDATE_USER_STATUS,
    SUPER_GET_COMPANY
} from './action-types';

export function userUpdate(payload) {
    return {
        type: SUPER_USER_UPDATE,
        payload,
    };
}
export function getUsers(payload) {
    return {
        type: SUPER_GET_USERS,
        payload,
    }
}

export function addUser(payload){
    return {
        type: SUPER_ADD_USER,
        payload
    }
}

export function getUser(payload) {
    return {
        type: SUPER_GET_USER,
        payload
    }
}

export function deleteUser(payload){
    return {
        type: SUPER_DELETE_USER,
        payload
    }
}

export function userUpdateStatus(payload){
    return{
        type: SUPER_UPDATE_USER_STATUS,
        payload
    }
}

export function getCompanies(payload){
    return {
        type: SUPER_GET_COMPANY,
        payload
    }
}
