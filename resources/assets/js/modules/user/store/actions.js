/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */

import {
  USER_UPDATE,
  USER_UNSET,
  GET_USERS,
  ADD_USER,
  GET_USER,
  DELETE_USER,
  UPDATE_USER_STATUS
} from './action-types';

export function userUpdate(payload) {
  return {
    type: USER_UPDATE,
    payload,
  };
}

export function unsetUser() {
  return {
    type: USER_UNSET,
  }
}

export function getUsers(payload) {
    return {
      type: GET_USERS,
      payload,
    }
}

export function addUser(payload){
  return {
    type: ADD_USER,
    payload
  }
}

export function getUser(payload) {
  return {
      type: GET_USER,
      payload
  }
}

export function deleteUser(payload){
  return {
    type: DELETE_USER,
    payload
  }
}

export function userUpdateStatus(payload){
  return{
    type: UPDATE_USER_STATUS,
     payload
  }
}

