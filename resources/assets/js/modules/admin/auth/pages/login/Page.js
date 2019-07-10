// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { login } from '../../../../auth/service'
import ReeValidate from 'ree-validate'

import { Container, Row, Col } from 'reactstrap';

// import components
import Form from './components/Form'

// initialize component
class Page extends Component {
  // set name of the component
  static displayName = 'SuperLoginPage'

  // validate props
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      email: 'required|email',
      password: 'required|min:6'
    })

    // set the state of the app
    this.state = {
      credentials: {
        email: '',
        password: '',
        remember: false,
      },
      errors: this.validator.errors
    }

    // bind component with event handlers
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // event to handle input change
  handleChange(name, value) {
    const { errors } = this.validator

    this.setState({ credentials: { ...this.state.credentials, [name]: value } })

    errors.remove(name)

    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }

  // event to handle form submit
  handleSubmit(e) {
    e.preventDefault()
    const { credentials } = this.state
    const { errors } = this.validator

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
          this.submit(credentials)
        } else {
          this.setState({ errors })
        }
      })
  }

  submit(credentials) {
    this.props.dispatch(login(credentials))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        } else if (statusCode === 401) {
          errors.add('password', error);
        }

        this.setState({ errors })
      })
  }

  // render component
  render() {

    // check if user is authenticated then redirect him to home page
    if (this.props.isAuthenticated) {
      if (this.props.role === "admin") {
        return <Redirect to="/super/analytics" />
      } else {
        return <Redirect to="/calendars" />
      }
    }
    const props = {
      email: this.state.credentials.email,
      password: this.state.credentials.password,
      remember: this.state.credentials.remember,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    }

    return (<div className="app flex-row align-items-center set-min-height">
      <Container>
        <Row className="justify-content-center">
          <Col md="5">
            <Form {...props} />
          </Col>
        </Row>
      </Container>
    </div>)
  }
}

export default Page
