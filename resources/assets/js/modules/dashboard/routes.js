// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
    path: '/dashboard',
    exact: true,
    auth: true,
    roles: [
        'company',
        'user'
    ],
    component: Loadable({
      loader: () => import('./pages/analyse'),
      loading: LoadingComponent,
    }),
  },
]
