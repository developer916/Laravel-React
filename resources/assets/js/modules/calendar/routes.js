// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
    path: '/calendars',
    exact: true,
    auth: true,
    roles: [
        'company',
        'user'
    ],
    component: Loadable({
      loader: () => import('./pages/list'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/calendars/new',
    exact: true,
    auth: true,
    roles: [
      'company',
     ],
    component: Loadable({
      loader: () => import('./pages/new'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/calendars/:id/edit',
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
    path: '/calendars/:id/view',
    exact: true,
    auth: true,
    roles: [
      'company',
      'user'
    ],
    component: Loadable({
      loader: () => import('./pages/view'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/calendars/:id/subscription-generator',
    exact: true,
    auth: true,
    roles: [
      'company',
    ],
    component: Loadable({
      loader: () => import('./pages/code'),
      loading: LoadingComponent,
    }),
  },
]
