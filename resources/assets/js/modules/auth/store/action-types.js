// auth action types
export const AUTH_CHECK = 'AUTH_CHECK'
export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN'
export const AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD'
export const AUTH_USER = 'AUTH_USER'

//uuid
export const AUTH_UUID = 'AUTH_UUID'
// user created action
export const AUTH_CREATED = 'AUTH_REGISTER'
// company address action type
export const AUTH_COMPANY_ADDRESS = 'AUTH_COMPANY_ADDRESS'
// company sepa action type
export const AUTH_COMPANY_SEPA = 'AUTH_COMPANY_SEPA'
export const AUTH_USER_ROLE = 'AUTH_USER_ROLE'
export const AUTH_USER_ACTIVATED = 'AUTH_USER_ACTIVATED'

export default {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_USER,

  // uuid
  AUTH_UUID,
  // export user created action type
  AUTH_CREATED,
  // export company address action type
  AUTH_COMPANY_ADDRESS,
  // export company sepa action
  AUTH_COMPANY_SEPA,
  AUTH_USER_ROLE,
  AUTH_USER_ACTIVATED
}
