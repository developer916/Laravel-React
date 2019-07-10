// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import { Redirect } from 'react-router-dom'

import { licenseAddRequest } from '../../service'

// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'CreateLicense'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    license: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      name: 'required',
      description: 'required',
      price: 'required',
      // language: 'required',
      numberOfCalendars: 'required',
      numberOfEvents: 'required',
      numberOfSubscribers: 'required',
      enabledHtml: 'required',
      enabledWebsite: 'required',
      enabledSocial: 'required',
      enabledFunction: 'required'
    })

    const license = this.props.license.toJson()

    this.state = {
      license,
      submitted: false,
      errors: this.validator.errors
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const license = nextProps.license.toJson()

    if (!_.isEqual(this.state.license, license)) {
      this.setState({ license })
    }
  }

  onChange(name, value) {
    const { errors } = this.validator

    this.setState({ license: { ...this.state.license, [name]: value} })

    errors.remove(name)

    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }

  onSubmit(e) {
    e.preventDefault()
    const license = this.state.license
    const {errors} = this.validator

    this.validator.validateAll(license)
      .then((success) => {
        if (success) {
          this.setState({
            submitted: true
          })
          this.submit(license)
        } else {
          this.setState({errors})
        }
      })
  }

  submit(license) {
    this.props.dispatch(licenseAddRequest(license))
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

  render() {
    if (this.state.submitted) {
      return (<Redirect to="/super/licenses"/>);
    }

    return <div className="animated fadeIn">
      <Form {...this.state}
            onChange={this.onChange}
            onSubmit={this.onSubmit}/>
    </div>
  }
}

export default Page
