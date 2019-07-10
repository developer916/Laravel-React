// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
    path: '/subscription-generator',
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
