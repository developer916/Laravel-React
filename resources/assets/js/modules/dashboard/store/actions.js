/* ============
 * Actions for the dashboard module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  DASHBOARD_DATA,
} from './action-types';

export function getDashboardData(payload) {
  return {
    type: DASHBOARD_DATA,
    payload,
  }
}