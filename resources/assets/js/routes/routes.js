// import modular routes
import authRoutes from "../modules/auth/routes"
import superRoutes from "../modules/admin/routes";
import publicRoutes from "../modules/public/routes"
import calendarsRoutes from "../modules/calendar/routes"
import geolocationRoutes from "../modules/geolocation/routes"
import timeperiodRoutes from "../modules/timeperiod/routes"
import dashboardRoutes from "../modules/dashboard/routes"
import eventRoutes from "../modules/events/routes"
import codeRoutes from "../modules/sub-code-generator/routes"
import subscriberRoutes from "../modules/subscribers/routes"
import settingRoutes from "../modules/settings/routes"
import usersRoutes from "../modules/user/routes"

export default [
  ...publicRoutes,
  ...authRoutes,
  ...superRoutes,
  ...calendarsRoutes,
  ...geolocationRoutes,
  ...timeperiodRoutes,
  ...dashboardRoutes,
  ...eventRoutes,
  ...codeRoutes,
  ...subscriberRoutes,
  ...settingRoutes,
  ...usersRoutes
]
