//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { registerCompanyInfo } from '../../service'
import ReeValidate from 'ree-validate'

import { Container, Row, Col } from 'reactstrap'

// import components
import Form from './components/Form'

// initialize component
class Page extends Component {
  static displayName = 'AddressPage'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      name: 'required',
      street: 'required',
      postalCode: 'required|min:5',
      city: 'required|min:2',
      country: 'required|min:2',
      phone: 'required|min:10',
      email: 'email',
      website: 'url',
      taxId: '',
    })
    
    this.state = {
      credentials: {
        name: '',
        street: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        email: '',
        website: '',
        taxId: '',
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
    this.props.dispatch(registerCompanyInfo(credentials))
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
    const { name, street, postalCode, city, country, phone, email, website, taxId } = this.state.credentials
    const props = {
      name,
      street,
      postalCode,
      city,
      country,
      phone,
      email,
      website,
      taxId,
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
