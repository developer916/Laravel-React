// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../../common/loader'


export default [
  {
    path: '/super/login',
    admin: true,
    exact: true,
    component: Loadable({
      loader: () => import('./pages/login'),
      loading: LoadingComponent,
    }),
  },
  // {
  //   path: '/super/settings',
  //   admin: true,
  //   auth: true,
  //   exact: true,
  //   component: Loadable({
  //     loader: () => import('./pages/settings'),
  //     loading: LoadingComponent,
  //   }),
  // },
]
