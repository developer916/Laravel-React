//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { registerCompanyAddress } from '../../service'
import ReeValidate from 'ree-validate'

import { Container, Row, Col } from 'reactstrap'

// import components
import Form from './components/Form'

// initialize component
class Page extends Component {
  static displayName = 'AddressPage'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.any,
    companyId: PropTypes.any,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      userId: 'required',
      name: 'required',
      street: 'required',
      postalCode: 'required|min:5',
      city: 'required|min:2',
      country: 'required|min:2',
      phone: 'required|min:10',
      email: 'email',
      website: 'url',
    })
    
    this.state = {
      credentials: {
        userId: this.props.userId,
        name: '',
        street: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        email: '',
        website: '',
        taxId: '',
        description: '',
      },
      errors: this.validator.errors,
      fields: this.validator.fields
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDescChange = this.handleDescChange.bind(this)
  }

  // event to quill text change
  handleDescChange(value) {
    this.setState({credentials: { ...this.state.credentials, description: value }})
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
    this.props.dispatch(registerCompanyAddress(credentials))
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
    if (this.props.companyId !== 0) {
      return <Redirect to="/register/sepa" />
    }

    const { userId, name, street, postalCode, city, country, phone, email, website, taxId, description } = this.state.credentials
    const props = {
      userId,
      name,
      street,
      postalCode,
      city,
      country,
      phone,
      email,
      website,
      taxId,
      description,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      handleDescChange: this.handleDescChange,
    }
    
    return (<div className="app flex-row align-items-center set-min-height" >
      <Container>
        <Row className="justify-content-center">
          <Col md="7">
            <Form {...props}  />
          </Col>
        </Row>
      </Container>
    </div>)
  }
}

export default Page
