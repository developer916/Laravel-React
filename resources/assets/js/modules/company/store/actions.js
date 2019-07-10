/* ============
 * Actions for the company module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  COMPANY_STORE_ADDRESS,
  COMPANY_STORE_SEPA,
  COMPANY_STORE_CONFIRMATION,
} from './action-types';

export function storeCompanyAddress() {
  return {
    type: COMPANY_STORE_ADDRESS
  }
}

export function storeCompanySepa() {
  return {
    type: COMPANY_STORE_SEPA
  }
}

export function storeCompanyConfirmation() {
  return {
    type: COMPANY_STORE_CONFIRMATION
  }
}