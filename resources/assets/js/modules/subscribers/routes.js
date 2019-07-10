// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
    path: '/subscribers',
    exact: true,
    auth: true,
    roles: [
      'company',
    ],
    component: Loadable({
      loader: () => import('./pages/list'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/subscribers/:id/edit',
    exact: true,
    auth: true,
    roles: [
      'company',
    ],
    component: Loadable({
      loader: () => import('./pages/edit'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/subscribers/:id/view',
    exact: true,
    auth: true,
    roles: [
      'company',
    ],
    component: Loadable({
      loader: () => import('./pages/view'),
      loading: LoadingComponent,
    }),
  },
]