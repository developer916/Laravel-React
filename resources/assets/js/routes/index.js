// import libs
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

// import components
import routes from './routes'
import PublicRoute from './Public'
import UserRoute from './User'
import AdminRoute from './Admin'

import Layout from '../layout'

const history = createBrowserHistory()

const Routes = () => (
  <Router hisotry={history}>
    <Layout>
      <Switch>
        {routes.map((route, i) => {
          if (route.auth) {
            if (route.admin) {
              return <AdminRoute key={i} {...route} />
            } else {
              return <UserRoute key={i} {...route} />
            }
          } else {
            return <PublicRoute key={i} {...route} />
          }
        })}
      </Switch>
    </Layout>
  </Router>
)

export default Routes
