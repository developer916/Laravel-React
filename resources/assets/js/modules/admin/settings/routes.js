// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../../common/loader'


export default [
    {
        path: '/super/password',
        exact: true,
        auth: true,
        admin: true,
        component: Loadable({
            loader: () => import('./pages/password'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/super/maintenance',
        exact: true,
        auth: true,
        admin: true,
        component: Loadable({
        loader: () => import('./pages/maintenance'),
        loading: LoadingComponent,
    }),
    },
]