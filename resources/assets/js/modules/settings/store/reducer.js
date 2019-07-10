import Company from '../../company/Company';

import {
    UPDATE_COMPANY_ADDRESS,
    UPDATE_COMPANY_SEPA,
    UPDATE_PASSWORD,
    UPDATE_SMTP,
    GET_COMPANY,
} from './action-types';

const initialState = {
    company: new Company({}),
    isSuccess: false,
}


const reducer = (state = initialState, { type, payload = null, search = '', isSuccess = false }) => {
    switch(type) {
        case GET_COMPANY:
            return getCompany(state, payload)
        case UPDATE_COMPANY_ADDRESS :
            return updateCompanyAddress(state, payload, isSuccess)
        case UPDATE_COMPANY_SEPA:
            return updateCompanySepa(state, payload)
        case UPDATE_SMTP:
            return updateCompanySMTP(state, payload);
        case UPDATE_PASSWORD:
            return updatePassword(state, payload);
        default:
            return state
    }
}


function getCompany(state, payload){
    state = Object.assign({}, state, { company: payload.company })

    return state
}

function updateCompanyAddress(state, payload, isSuccess){
    return Object.assign({}, state, {
        isSuccess: isSuccess
    })
}

function updateCompanySepa(state, payload){
    return Object.assign({}, state, {})
}

function updateCompanySMTP(state, payload) {
    return Object.assign({}, state, {})
}

function updatePassword(state,payload){
    return Object.assign({}, state, {})
}
export default reducer;