// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'


export default [
  {
    path: '/login',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/login'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/register',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/register'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/register/address',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/address'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/register/sepa',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/sepa'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/register/confirmation',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/confirmation'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/confirmation/:token',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/confirmationEmail'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/forgot-password',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/forgotPassword'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/forgot_password/:token',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/resetPassword'),
      loading: LoadingComponent,
    }),
  }
]
