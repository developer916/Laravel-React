import _ from 'lodash'
import HTTP from '../../../utils/Http';
import uuidv4 from 'uuid/v4'

import {
  AUTH_UUID,
  AUTH_CHECK,
  AUTH_USER,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_CREATED,
  AUTH_COMPANY_ADDRESS,
  AUTH_COMPANY_SEPA, AUTH_USER_ROLE,
  AUTH_USER_ACTIVATED
} from './action-types';

const initialState = {
  isAuthenticated: false,
  userId: 0,
  companyId: 0,
  confirmationLink: '',
  role: '',
  isActive: false,
  license: {}
};

const reducer = (state = initialState, {type, payload = null, userId = 0, companyId = 0, confirmationLink = '', role = '', isActive = false}) => {
  switch (type) {
    case AUTH_REFRESH_TOKEN:
    case AUTH_LOGIN:
      return login(state, payload);
    case AUTH_CHECK:
      return checkAuth(state);
    case AUTH_USER:
      return auth(state, payload);
    case AUTH_UUID:
      return uuidCheck(state);
    case AUTH_LOGOUT:
      return logout(state);
    case AUTH_RESET_PASSWORD:
      return resetPassword(state);
    case AUTH_CREATED:
      return createdUser(state, userId);
    case AUTH_COMPANY_ADDRESS:
      return createdCompany(state, companyId);
    case AUTH_COMPANY_SEPA:
      return createdCompanySepa(state, confirmationLink);
    case AUTH_USER_ROLE:
      return setUserRole(state, role);
    case AUTH_USER_ACTIVATED:
      return setUserActive(state, isActive);
    default:
      return state;
  }
};

function createdCompanySepa(state, confirmationLink) {
  return {
    ...state, confirmationLink: confirmationLink,
  }
}

function setUserRole(state, role) {
  localStorage.setItem('role', role);

  return {
    ...state, role: role,
  }
}

function createdCompany(state, companyId) {
  localStorage.setItem('companyId', companyId);

  return {
    ...state, companyId: companyId,
  }
}

function createdUser(state, userId) {
  localStorage.setItem('userId', userId);

  return {
    ...state, userId: userId,
  }
}

function login(state, payload) {
  // setting up accessToken
  let accessToken = payload.data.accessToken;
  localStorage.setItem('access_token', accessToken);
  HTTP.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  // setting up role
  let role = payload.user.role;
  localStorage.setItem('role', role);
  // setting up userId
  let userId = payload.user.id;
  localStorage.setItem('userId', userId);
  // setting up companyId
  let companyId = payload.user.companyId;
  localStorage.setItem('companyId', companyId);
  // setting up license
  let license = _.has(payload, 'license') ? (_.isEmpty(payload.license) ? {} : payload.license) : {}
  localStorage.setItem('license', JSON.stringify(license));

  return {
    ...state,
    companyId: companyId,
    userId: userId,
    isAuthenticated: true,
    role: role,
    license: license
  }
}

function auth(state, payload) {
  let license = _.has(payload, 'license') ? (_.isEmpty(payload.license) ? {} : payload.license) : {}
  localStorage.setItem('license', JSON.stringify(license));

  return {
    ...state,
    license: license
  }
}

function checkAuth(state) {
  state = Object.assign({}, state, {
    isAuthenticated: !!localStorage.getItem('access_token'),
    role: localStorage.getItem('role') ? localStorage.getItem('role') : '',
    companyId: localStorage.getItem('companyId') ? localStorage.getItem('companyId') : 0,
    userId: localStorage.getItem('userId') ?  localStorage.getItem('userId') : 0,
    license: localStorage.getItem('license') ? JSON.parse(localStorage.getItem('license')) : {},
  });

  if (state.isAuthenticated) {
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
  }

  return state;
}

function uuidCheck(state) {
  let uuid = localStorage.getItem('uuid')
  if (_.isEmpty(uuid)) {
    uuid = uuidv4();
    localStorage.setItem('uuid', uuid);
  }

  state = Object.assign({}, state, {
    uuid: uuid
  });

  return state;
}

function logout(state) {
  localStorage.removeItem('access_token');
  localStorage.removeItem('calendarList');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('companyId');

  return {
    ...state, isAuthenticated: false, role: '', companyId: 0, userId: 0
  }
}

function resetPassword(state) {
  return {
    ...state, resetPassword: true,
  }
}

function setUserActive(state, isActive) {
  return {
    ...state, isActive: isActive
  }
}

export const getAuth = state => state.auth.isAuthenticated;
export const getUserId = state => state.auth.userId;

export default reducer;
