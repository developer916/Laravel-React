//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { updateCompanySepa } from '../../service'
import ReeValidate from 'ree-validate'

import { Container, Row, Col } from 'reactstrap'
import { getCompanyData } from '../../service'

// import components
import Form from './components/Form'

// initialize component
class Page extends Component {
  static displayName = 'SepaPage'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.any,
    companyId: PropTypes.any,
  }
  
  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      userId: 'required',
      iban: 'required',
      bic: 'required',
    })
    const company = this.props.company;
    this.state = {
      // credentials: {
      //   userId: this.props.userId,
      //   iban: '',
      //   bic: '',
      //   update_sepa : 1
      // },
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
          // this.setState({credentials:{
          //     userId: this.props.userId,
          //     iban : company.iban,
          //     bic : company.bic,
          //     update_sepa : 1
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
          let credentials = {
              userId: this.props.userId,
              iban: company.iban,
              bic : company.bic,
              update_sepa : 1

          }
          this.submit(credentials)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(credentials) {
    this.props.dispatch(updateCompanySepa(credentials))
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
      <div className="update-sepa animated fadeIn">
        <Form {...props}  />
      </div>
    )
  }
}

export default Page
