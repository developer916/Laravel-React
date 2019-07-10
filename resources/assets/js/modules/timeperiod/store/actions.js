/* ============
 * Actions for the super/company module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  DATA_CHARTS_LIST,
} from './action-types';

export function list(payload, searchType, searchCalendarId) {
  return {
    type: DATA_CHARTS_LIST,
    payload,
    searchType,
    searchCalendarId
  }
}