// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
    path: '/events',
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
    path: '/events/add',
    exact: true,
    auth: true,
    roles: [
      'company',
    ],
    component: Loadable({
      loader: () => import('./pages/add'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/events/:id/edit',
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
]
