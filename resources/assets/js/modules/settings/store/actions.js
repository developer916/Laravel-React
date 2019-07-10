import {
    UPDATE_COMPANY_ADDRESS,
    UPDATE_COMPANY_SEPA,
    UPDATE_PASSWORD,
    UPDATE_SMTP,
    GET_COMPANY,
} from './action-types';

export function getCompany(payload) {
    return {
        type: GET_COMPANY,
        payload,
    }
}

export function updateCompanyAddress(payload, isSuccess){
    return {
        type: UPDATE_COMPANY_ADDRESS,
        payload,
        isSuccess
    }
}

export function updateCompanySepa(payload){
    return {
        type: UPDATE_COMPANY_SEPA,
        payload,
    }
}

export function updateCompanySMTP(payload){
    return {
        type: UPDATE_SMTP,
        payload,
    }
}

export function updatePassword(payload){
    return {
        type: UPDATE_PASSWORD,
        payload,
    }
}
