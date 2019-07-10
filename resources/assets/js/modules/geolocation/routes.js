// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
    path: '/world-map',
    exact: true,
    auth: true,
    roles: [
        'company',
    ],
    component: Loadable({
      loader: () => import('./pages/datamap'),
      loading: LoadingComponent,
    }),
  },
]
