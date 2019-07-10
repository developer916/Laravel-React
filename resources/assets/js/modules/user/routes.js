// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
      path: '/users',
      exact: true,
      auth: true,
      roles: [
        'company'
      ],
      component: Loadable({
          loader: () => import('./pages/list'),
          loading: LoadingComponent,
      }),
  },
  {
    path: '/users/add',
    exact: true,
    auth: true,
    roles: [
      'company'
    ],
    component: Loadable({
    loader: () => import('./pages/add'),
        loading: LoadingComponent,
    }),
  },

  {
    path: '/users/:id/edit',
    exact: true,
    auth: true,
    roles: [
      'company'
    ],
    component: Loadable({
      loader: () => import('./pages/edit'),
      loading: LoadingComponent,
    }),
  },

]