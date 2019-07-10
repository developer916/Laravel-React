import User from '../User'
import { USER_UPDATE , USER_UNSET , GET_USERS, ADD_USER, GET_USER, DELETE_USER, UPDATE_USER_STATUS} from './action-types'
import { AUTH_LOGOUT, AUTH_USER } from '../../auth/store/action-types'

const initialState = {
    users: [],
    user: new User({})
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case AUTH_USER:
      return authUser(state, payload)
    case USER_UPDATE:
      return updateUser(state, payload);
    case AUTH_LOGOUT:
    case USER_UNSET:
      return unsetUser(state);
    case GET_USERS:
      return getUsers(state, payload)
    case ADD_USER :
      return addUser(state, payload);
    case GET_USER :
      return getUser(state,payload);
    case DELETE_USER:
      return deleteUser(state, payload);
    case UPDATE_USER_STATUS:
      return updateUserStatus(state, payload);
    default:
      return state
  }
}

function updateUser(state, payload) {
  // return {
  //   ...state, ...payload
  // }
    let user = payload.user;
    let userList = state.users;
    for (let i = 0; i < userList.length; i ++) {
        if (userList[i].id === user.id) {
            userList[i] = user;
            break;
        }
    }
    return {
        ...state, users: userList
    }
}

function unsetUser(state) {
  return {
    ...state, initialState
  }
}

function authUser(state, user) {
  return {
    ...state, ...user
  }
}

function getUsers(state, payload){
    state = Object.assign({}, state, { users: payload.users })

    return state
}

function addUser(state, payload){
    let userList = state.users;
    userList.push(payload.user);
    return {
        ...state, users: userList
    }
  return state;
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
