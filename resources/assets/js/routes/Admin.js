import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import Main from '../Main'

const AdminRoute = ({ component: Component, isAuthenticated, role, ...rest }) => {
    let site_url = window.location.origin + '/';
    let current_url = window.location.href;
    if ((current_url == site_url + "privacy") || (current_url == site_url + "terms_of_conditions") || (current_url == site_url + "impressum")) {
        return (<Route {...rest} render={props => (<Component {...props}/>)}/>);
    } else {
        return <Route {...rest} render={props => (
            isAuthenticated && role === 'admin'
                ? <Component {...props}/>
                : ( role === 'company'
                    ? <Redirect to={{
                        pathname: '/',
                        state: {from: props.location},
                    }}/>
                    : <Redirect to={{
                        pathname: '/',
                        state: {from: props.location},
                    }}/>)
        )}/>
    }

}

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    role: store.auth.role,
  }
}

export default connect(mapStateToProps)(AdminRoute)
