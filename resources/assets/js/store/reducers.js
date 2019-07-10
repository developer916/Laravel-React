import { combineReducers } from 'redux'

import auth from '../modules/auth/store/reduer';
import user from '../modules/user/store/reducer';
import calendar from '../modules/calendar/store/reduer';
import publicReducer from '../modules/public/store/reduer';
import superCompany from '../modules/admin/company/store/reducer';
import superCategories from '../modules/admin/categories/store/reducer';
import superLicense from '../modules/admin/license/store/reducer';
import superSettings from '../modules/admin/settings/store/reducer';
import superUser from '../modules/admin/users/store/reducer';
import superAnalyse from '../modules/admin/dashboard/store/reducer';
import superDatamap from '../modules/geolocation/store/reducer';
import superCharts from '../modules/timeperiod/store/reducer';
import superDashboard from '../modules/dashboard/store/reducer';
import events from '../modules/events/store/reducer';
import codeGenerator from '../modules/sub-code-generator/store/reducer';
import shbReducer from '../modules/sub-code-generator/pages/code/components/store/reducer';
import subscribers from '../modules/subscribers/store/reducer';
import settingsReducer from '../modules/settings/store/reducer';

export default combineReducers({
  auth,
  user,
  calendar,
  publicReducer,
  superCompany,
  superCategories,
  superLicense,
  superSettings,
  superUser,
  superAnalyse,
  superDatamap,
  superCharts,
  superDashboard,
  events,
  codeGenerator,
  shbReducer,
  subscribers,
  settingsReducer
})
