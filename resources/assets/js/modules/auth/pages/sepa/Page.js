//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { registerCompanySepa } from '../../service'
import ReeValidate from 'ree-validate'

import { Container, Row, Col } from 'reactstrap'

// import components
import Form from './components/Form'

// initialize component
class Page extends Component {
  static displayName = 'SepaPage'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.any,
    companyId: PropTypes.any,
    confirmationLink: PropTypes.string.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      userId: 'required',
      iban: 'required',
      bic: 'required',
    })
    
    this.state = {
      credentials: {
        userId: this.props.userId,
        iban: '',
        bic: '',
      },
      errors: this.validator.errors,
      fields: this.validator.fields
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  // event to handle input change
  handleChange(name, value) {
    const { errors } = this.validator

    this.setState({credentials: { ...this.state.credentials, [name]: value }})
    errors.remove(name)
    
    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }
  
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
    this.props.dispatch(registerCompanySepa(credentials))
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
  
  render() {
    // check if user is not created then redirect him to register page
    if (this.props.userId === 0) {
      return <Redirect to="/register" />
    }
    // check if company is not created then redirect him to register/address page
    if (this.props.companyId === 0) {
      return <Redirect to="/register/address" />
    }
    // check if company sepa is not created then redirect him to register/confirmation page
    if (this.props.confirmationLink !== '') {
      return <Redirect to="/register/confirmation" />
    }

    const { userId, iban, bic } = this.state.credentials
    const props = {
      userId,
      iban,
      bic,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    }
    
    return (<div className="app flex-row align-items-center set-min-height" >
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Form {...props}  />
          </Col>
        </Row>
      </Container>
    </div>)
  }
}

export default Page
