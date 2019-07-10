// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../../common/loader'

export default [
  {
    path: '/super/licenses',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/list'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/super/licenses/add',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/add'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/super/licenses/:id/edit',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/edit'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/super/licenses/:id/view',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/view'),
      loading: LoadingComponent,
    }),
  },
]