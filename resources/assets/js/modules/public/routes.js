// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

const routes = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/home'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/calendar/:hashCode/detail',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/detail'),
      loading: LoadingComponent,
    }),
  },
  {
      path: '/calendar/:hashCode/subscribe',
          exact: true,
      component: Loadable({
      loader: () => import('./pages/subscribe'),
        loading: LoadingComponent,
    }),
  },
  {
    path: '/events/link/:hashCode',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/event'),
      loading: LoadingComponent,
    }),
  },
  {
      path: '/company/:company',
          exact: true,
      component: Loadable({
      loader: () => import('./pages/company'),
        loading: LoadingComponent,
    }),
  },
  {
      path: '/privacy',
      exact: true,
      component: Loadable({
        loader: () => import('./pages/privacy'),
        loading: LoadingComponent,
      }),
  },
  {
      path: '/terms_of_conditions',
          exact: true,
      component: Loadable({
        loader: () => import('./pages/terms'),
        loading: LoadingComponent,
    }),
  },
  {
      path: '/impressum',
          exact: true,
      component: Loadable({
      loader: () => import('./pages/impressum'),
        loading: LoadingComponent,
    }),
  },
]

export default routes
