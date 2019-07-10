//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { updateCompanyAddress } from '../../service'
import ReeValidate from 'ree-validate'

import { Container, Row, Col } from 'reactstrap'
import { getCompanyData } from '../../service'

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
      const company = this.props.company;

    this.state = {
      company,
      toCalendars: false,
      errors: this.validator.errors,
      fields: this.validator.fields
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDescChange = this.handleDescChange.bind(this)
  }


  componentWillMount() {
    const {dispatch, companyId}   = this.props;
    let params = {
      company_id: companyId
    }
      dispatch(getCompanyData(params));
  }

  componentWillReceiveProps(nextProps) {
      const company = nextProps.company
      if (!_.isEqual(this.state.company, company)) {
          this.setState({ company })
      }
  }
  // event to quill text change
  handleDescChange(value) {
    this.setState({company: { ...this.state.company, description: value }})
  }
  
  // event to handle input change
  handleChange(name, value) {
    const { errors } = this.validator

    this.setState({company: { ...this.state.company, [name]: value }})
    errors.remove(name)
    
    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    const { company } = this.state
    const { errors } = this.validator
  
    this.validator.validateAll(company)
      .then((success) => {
        if (success) {
          let credentials = {
              userId: this.props.userId,
              name: company.name,
              street: company.street,
              postalCode: company.postalCode,
              city: company.city,
              country: company.country,
              phone: company.phone,
              email: company.email,
              website: company.website,
              taxId: company.taxId,
              description: company.description,
          }
          this.submit(credentials)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(credentials) {
    this.props.dispatch(updateCompanyAddress(credentials))
      .then(res => {
        if (res.status == 'success') {
            this.setState({toCalendars: true});
        }
      })
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
      if (this.state.toCalendars) {
          return (<Redirect to="/calendars"/>);
      }
    const props = {
      company: this.state.company,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      handleDescChange: this.handleDescChange,
    }
    
    return (
        <div className="update-address animated fadeIn">
            <Form {...props}  />
        </div>

    )
  }
}

export default Page
