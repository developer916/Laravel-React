// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { companyUpdateRequest, companyEditRequest } from '../../service'
import ReeValidate from 'ree-validate'
import { Redirect } from 'react-router-dom'

// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'CreateCompany'
  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
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
      email: 'required|email',
      website: 'url',
      status: 'required',
      iban: 'required',
      bic: 'required',
    })

    const company = this.props.company.toJson()

    this.state = {
      company,
      formStep: 1, // 1 - address step, 2 - sepa step
      submitted: false,
      errors: this.validator.errors
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onDescChange = this.onDescChange.bind(this)
    this.onNextStep = this.onNextStep.bind(this)
    this.onPrevStep = this.onPrevStep.bind(this)
  }

  componentWillMount() {
    this.loadCompany()
  }

  componentWillReceiveProps(nextProps) {
    const company = nextProps.company.toJson()

    if (!_.isEqual(this.state.company, company)) {
      this.setState({ company })
    }
  }

  loadCompany() {
    const { match, company, dispatch } = this.props

    if (!company.id) {
      dispatch(companyEditRequest(match.params.id))
    }
  }

  onPrevStep() {
    this.setState({
      formStep: (this.state.formStep - 1)
    })
  }

  onNextStep() {
    this.setState({
      formStep: (this.state.formStep + 1)
    })
  }

  onChange(name, value) {
    const { errors } = this.validator

    this.setState({ company: { ...this.state.company, [name]: value} })

    errors.remove(name)

    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }

  onSubmit(e) {
    e.preventDefault()
    const company = this.state.company
    const { errors } = this.validator

    this.validator.validateAll(company)
      .then((success) => {
        if (success) {
          this.submit(company)
        } else {
          this.setState({ errors })
        }
      })
  }

  submit(company) {
    this.props.dispatch(companyUpdateRequest(company))
      .then(res => {
          if (res.status == 'success') {
              this.setState({submitted: true});
          }
      })
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }

        this.setState({ errors })
      })
  }

  onDescChange(value) {
    this.setState({ company: { ...this.state.company, description: value} })
  }

  render() {
    if (this.state.submitted) {
      return (<Redirect to="/super/companies"/>);
    }

    return <div className="animated fadeIn">
      <Form {...this.state}
            onNextStep={this.onNextStep}
            onPrevStep={this.onPrevStep}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onDescChange={this.onDescChange}/>
    </div>
  }
}

export default Page
