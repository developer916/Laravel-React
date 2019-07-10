import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PublicRoutes = ({ component: Component, isAuthenticated, role,maintenance, ...rest }) => {
    let site_url = window.location.origin + '/';
    let current_url = window.location.href;
    if ((current_url == site_url + "privacy") || (current_url == site_url + "terms_of_conditions") || (current_url == site_url + "impressum")) {
        return (<Route {...rest} render={props => (<Component {...props}/>)}/>);
    } else {

        if (isAuthenticated) {
            if (role === 'admin') {
                return <Route {...rest} render={props => (
                    <Redirect to={{
                        pathname: '/super/analytics',
                        state: {from: props.location},
                    }}/>)}/>
            } else {
                if (maintenance == 'true') {
                    return <Route {...rest} render={props => (
                        <Redirect to={{
                            pathname: '/',
                            state: {from: props.location},
                        }}/>)}/>
                } else {
                    return <Route {...rest} render={props => (
                        <Redirect to={{
                            pathname: '/calendars',
                            state: {from: props.location},
                        }}/>)}/>
                }
            }
        } else {
            if (maintenance == 'true') {

                if (window.location.href != site_url) {
                    return <Route {...rest} render={props => (
                        <Redirect to={{
                            pathname: '/',
                            state: {from: props.location},
                        }}/>)}/>
                } else {
                    return (<Route {...rest} render={props => (<Component {...props}/>)}/>);
                }
            } else {
                return (<Route {...rest} render={props => (<Component {...props}/>)}/>);
            }
        }
    }
}

PublicRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    role: store.auth.role,
    maintenance : localStorage.getItem('maintenance') ? localStorage.getItem('maintenance') : store.publicReducer.maintenance
  }
}

export default connect(mapStateToProps)(PublicRoutes)
