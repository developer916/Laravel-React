// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'


export default [
    {
        path: '/settings/address',
        exact: true,
        auth: true,
        roles: [
            'company'
        ],
        component: Loadable({
            loader: () => import('./pages/address'),
            loading: LoadingComponent,
        })
    },

    {
        path: '/settings/sepa',
        exact: true,
        auth: true,
        roles: [
          'company'
        ],
        component: Loadable({
            loader: () => import('./pages/sepa'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/settings/smtp',
        exact: true,
        auth: true,
        roles: [
          'company'
        ],
        component: Loadable({
            loader: () => import('./pages/smtp'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/settings/password',
        exact: true,
        auth: true,
        roles: [
          'company',
          'user'
        ],
        component: Loadable({
            loader: () => import('./pages/password'),
            loading: LoadingComponent,
        }),
    },
]