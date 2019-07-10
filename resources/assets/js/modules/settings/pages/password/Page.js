//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { updatePassword } from '../../service'
import ReeValidate from 'ree-validate'

// import components
import Form from './components/Form'

// initialize component
class Page extends Component {
  static displayName = 'SMTPPage'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.any,
    companyId: PropTypes.any,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
        current_password: 'required|min:6',
        password: 'required|min:6',
        password_confirmation: 'required|min:6'
    })

    this.state = {
      credentials: {
        current_password: '',
        password: '',
        password_confirmation: '',
      },
      toCalendars : false,
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
    this.props.dispatch(updatePassword(credentials))
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

  if (this.state.toCalendars) {
      return (<Redirect to="/calendars"/>);
  }
    const props = {
      credentials: this.state.credentials,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    }
    
    return (
      <div className="update-password animated fadeIn">
        <Form {...props}  />
      </div>
    )
  }
}

export default Page
