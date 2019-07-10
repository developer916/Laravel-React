import User from '../../../user/User';

import {
    SUPER_GET_USERS,
    SUPER_ADD_USER,
    SUPER_GET_USER,
    SUPER_DELETE_USER,
    SUPER_UPDATE_USER_STATUS,
    SUPER_GET_COMPANY,
    SUPER_USER_UPDATE
} from './action-types'

const initialState = {
    users: [],
    user: new User({}),
    companies : []
}


const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case SUPER_GET_USERS:
            return getUsers(state, payload)
        case SUPER_ADD_USER :
            return addUser(state, payload);
        case SUPER_GET_USER :
            return getUser(state,payload);
        case SUPER_DELETE_USER:
            return deleteUser(state, payload);
        case SUPER_UPDATE_USER_STATUS:
            return updateUserStatus(state, payload);
        case SUPER_GET_COMPANY:
            return getCompany(state, payload);
        case SUPER_USER_UPDATE:
            return userUpdate(state, payload);
        default:
            return state
    }
}

function getCompany(state, payload){
    state = Object.assign({}, state, {  companies: payload.companies });
    return state;
}
function getUsers(state, payload){
    state = Object.assign({}, state, { users: payload.users, companies: payload.companies })

    return state
}

function addUser(state, payload){
    let userList = state.users;
    userList.push(payload.user);
    return {
        ...state, users: userList
    }
}
function userUpdate(state,payload){
    let userList = state.users;
    for (let i = 0; i < userList.length; i ++) {
        if (userList[i].id === payload.user.id) {
            userList[i] = payload.user
            break;
        }
    }
    return {
        ...state, users: userList
    }
}

function getUser(state, payload){

    state = Object.assign({}, state, { user: payload.user })

    return state
}
function deleteUser(state, payload) {
    let userList = state.users;
    for (let i = 0; i < userList.length; i ++) {
        if (userList[i].id === payload.userId) {
            userList.splice(i, 1);
            break;
        }
    }
    return {
        ...state, users: userList
    }
}



function updateUserStatus(state, payload){
    let userList = state.users;
    for (let i = 0; i < userList.length; i ++) {
        if (userList[i].id === payload.user.id) {
            userList[i] = payload.user
            break;
        }
    }
    return {
        ...state, users: userList
    }
}


export default reducer

