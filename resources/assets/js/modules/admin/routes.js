// import modular routes
import superAuthRoutes from "./auth/routes"
import superDashboardRoutes from "./dashboard/routes";
import superCompaniesRoutes from "./company/routes";
import superCategoriesRoutes from "./categories/routes";
import superLicensesRoutes from "./license/routes";
import superSettingRoutes from "./settings/routes";
import superUserRoutes from './users/routes';

export default [...superAuthRoutes, ...superDashboardRoutes, ...superCompaniesRoutes, ...superCategoriesRoutes , ...superLicensesRoutes, ...superSettingRoutes, ...superUserRoutes]