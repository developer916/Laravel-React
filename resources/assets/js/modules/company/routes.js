// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

export default [
  {
    path: '/register/address',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./pages/address'),
      loading: LoadingComponent,
    }),
  },
]