import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import Main from '../Main'

const UserRoute = ({ component: Component, isAuthenticated, role, maintenance, license, ...rest }) => {
    let site_url = window.location.origin + '/';
    let current_url = window.location.href;
    if ((current_url == site_url + "privacy") || (current_url == site_url + "terms_of_conditions") || (current_url == site_url + "impressum")) {
        return (<Route {...rest} render={props => (<Component {...props}/>)}/>);
    } else {
        if (isAuthenticated) {
            if (role === 'admin') {
                return <Route {...rest} render={props => (
                    <Redirect to={{
                        pathname: '/super/login',
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
                    if (rest.roles.indexOf(role) > -1) {
                        return <Route {...rest} render={props => (<Component {...props}/>)}/>
                    } else {
                        return <Route {...rest} render={props => (
                            <Redirect to={{
                                pathname: '/calendars',
                                state: {from: props.location},
                            }}/>)}/>
                    }
                }

            }
        } else {
            return <Route {...rest} render={props => (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location},
                }}/>)}/>
        }
    }
}

UserRoute.propTypes = {
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
    license: store.auth.license,
    maintenance : localStorage.getItem('maintenance') ? localStorage.getItem('maintenance') : store.publicReducer.maintenance
  }
}

export default connect(mapStateToProps)(UserRoute)
