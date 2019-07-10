//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// import services actions
import { fetchUser } from '../modules/auth/service'

// import components
import UserLayout from './User'
import AdminLayout from './Admin'
import PublicLayout from './Public'

class Layout extends Component {
  static displayName = 'Layout'
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    license: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props

    if (isAuthenticated && !user.id) {
      this.props.dispatch(fetchUser())
    }

  }

  render() {
    const { children, ...props } = this.props
      let site_url = window.location.origin + '/';
      let current_url = window.location.href;
      if ((current_url == site_url + "privacy") || (current_url == site_url + "terms_of_conditions") || (current_url == site_url + "impressum")) {
          return <PublicLayout {...props}>{children}</PublicLayout>
      } else {
          if (this.props.isAuthenticated) {
              if (this.props.role === 'admin') {
                  return <AdminLayout {...props}>{children}</AdminLayout>
              } else {
                  return <UserLayout {...props}>{children}</UserLayout>
              }
          }
          return <PublicLayout {...props}>{children}</PublicLayout>
      }

  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    user: state.user,
    license: state.auth.license,
    maintenance : localStorage.getItem('maintenance') ? localStorage.getItem('maintenance') : state.publicReducer.maintenance
  }
}

export default withRouter(connect(mapStateToProps)(Layout))
