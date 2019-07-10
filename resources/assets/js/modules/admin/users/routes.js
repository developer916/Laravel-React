// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../../common/loader'

export default [
    {
        path: '/super/users',
        exact: true,
        auth: true,
        admin: true,
        component: Loadable({
            loader: () => import('./pages/list'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/super/users/add',
        exact: true,
        auth: true,
        admin: true,
        component: Loadable({
            loader: () => import('./pages/add'),
            loading: LoadingComponent,
        }),
    },

    {
        path: '/super/users/:id/edit',
        exact: true,
        auth: true,
        admin: true,
        component: Loadable({
            loader: () => import('./pages/edit'),
            loading: LoadingComponent,
        }),
    },

]