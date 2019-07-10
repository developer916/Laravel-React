// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../../common/loader'

export default [
  {
    path: '/super/companies',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/list'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/super/companies/add',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/add'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/super/companies/:id/edit',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/edit'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/super/companies/:id/view',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/view'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/super/companies/:id/settings',
    exact: true,
    auth: true,
    admin: true,
    component: Loadable({
      loader: () => import('./pages/settings'),
      loading: LoadingComponent,
    }),
  }
]