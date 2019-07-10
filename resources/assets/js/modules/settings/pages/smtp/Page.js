//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { updateCompanySMTP } from '../../service'
import ReeValidate from 'ree-validate'

import { getCompanyData } from '../../service'

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
      smtpServer: 'required',
      smtpUser: 'required',
      smtpPassword: 'required',
      smtpFromEmail: 'required|email',
    })
    const company = this.props.company;
    this.state = {
      company,
      toCalendars : false,
      errors: this.validator.errors,
      fields: this.validator.fields
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //get current company information
  componentWillMount() {
    const {dispatch, companyId}   = this.props;
    let params = {
        company_id: companyId
    }
    dispatch(getCompanyData(params));
  }

  // add company information
  componentWillReceiveProps(nextProps) {
      const company = nextProps.company
      if (!_.isEqual(this.state.company, company)) {
          this.setState({ company })
          // this.setState({smtp:{
          //     smtp_server : company.smtpServer,
          //     smtp_user : company.smtpUser,
          //     smtp_password : company.smtpPassword,
          //     smtp_from_email: company.smtpFromEmail
          //   }
          // });
      }
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
        let smtp = {
            smtp_server : company.smtpServer,
            smtp_user : company.smtpUser,
            smtp_password : company.smtpPassword,
            smtp_from_email: company.smtpFromEmail
        }
          this.submit(smtp)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(smtp) {
    this.props.dispatch(updateCompanySMTP(smtp))
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
      company: this.state.company,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    }
    
    return (
      <div className="update-smtp animated fadeIn">
        <Form {...props}  />
      </div>
    )
  }
}

export default Page
