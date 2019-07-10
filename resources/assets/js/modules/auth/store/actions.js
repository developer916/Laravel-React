/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_USER,

  // uuid manage
  AUTH_UUID,
  // user action
  AUTH_CREATED,
  // company address action
  AUTH_COMPANY_ADDRESS,
  // company sepa action
  AUTH_COMPANY_SEPA, AUTH_USER_ROLE,
  AUTH_USER_ACTIVATED
} from './action-types';

export function authRegister(userId) {
  return {
    type: AUTH_CREATED,
    userId,
  }
}

export function authCompanySepaRegister(confirmationLink) {
  return {
    type: AUTH_COMPANY_SEPA,
    confirmationLink
  }
}

export function authCompanyAddressRegister(companyId) {
  return {
    type: AUTH_COMPANY_ADDRESS,
    companyId
  }
}

export function authUserRoleSet(userRole) {
  return {
    type: AUTH_USER_ROLE,
    userRole
  }
}

export function authCheck() {
  return {
    type: AUTH_CHECK,
  }
}

export function uuidCheck() {
  return {
    type: AUTH_UUID
  }
}

export function authLogin(payload) {
  return {
    type: AUTH_LOGIN,
    payload,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  }
}

export function authRefreshToken(payload) {
  return {
    type: AUTH_REFRESH_TOKEN,
    payload
  }
}

export function authResetPassword() {
  return {
    type: AUTH_RESET_PASSWORD,
  }
}

export function authUser(payload) {
  return {
    type: AUTH_USER,
    payload
  }
}

export function authUserConfirmation(isActive) {
  return {
    type: AUTH_USER_ACTIVATED,
    isActive
  }
}
