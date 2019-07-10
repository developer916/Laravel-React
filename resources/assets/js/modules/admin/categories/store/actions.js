import {
    SUPER_CATEGORY_LIST,
    SUPER_CATEGORY_ADD,
    SUPER_CATEGORY_UPDATE,
    SUPER_CATEGORY_REMOVE,
} from './action-types';


export function add(payload) {
    return {
        type: SUPER_CATEGORY_ADD,
        payload
    }
}

export function update(payload) {
    return {
        type: SUPER_CATEGORY_UPDATE,
        payload
    }
}

export function remove(payload) {
    return {
        type: SUPER_CATEGORY_REMOVE,
        payload
    }
}


export function list(payload) {
    return {
        type: SUPER_CATEGORY_LIST,
        payload
    }
}