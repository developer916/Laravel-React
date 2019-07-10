// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
    path: '/timeperiod',
    exact: true,
    auth: true,
    roles: [
        'company',
    ],
    component: Loadable({
      loader: () => import('./pages/charts'),
      loading: LoadingComponent,
    }),
  },
]
