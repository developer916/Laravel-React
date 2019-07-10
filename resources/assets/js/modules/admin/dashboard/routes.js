// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../../common/loader'

export default [
  {
    path: '/super/dashboard',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/dashboard'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/super/analytics',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/analytics'),
      loading: LoadingComponent,
    }),
  },
]