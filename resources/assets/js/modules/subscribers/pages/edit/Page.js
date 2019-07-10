// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import { Redirect } from 'react-router-dom'

import {subscriberEditRequest, subscriberUpdateRequest} from '../../service'
import {list} from "../../../calendar/service"

// import components
import Form from './components/Form'
// import components
import LoadingComponent from '../../../../common/loader'

class Page extends Component {
  static displayName = 'EditSubscriber'
  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    subscriber: PropTypes.object.isRequired,
    calendarList: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      companyId: 'required',
      calendarId: 'required',
      name: 'required',
      email: 'required',
      description: '',
      status: '',
    })

    const subscriber = this.props.subscriber.toJson()

    this.state = {
      subscriber,
      submitted: false,
      errors: this.validator.errors
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    this.loadSubscriber()
    this.loadCalendars()
  }

  componentWillReceiveProps(nextProps) {
    const subscriber = nextProps.subscriber.toJson()

    if (!_.isEqual(this.state.subscriber, subscriber)) {
      this.setState({subscriber})
    }
  }

  loadSubscriber() {
    const { match, subscriber, dispatch } = this.props

    if (!subscriber.id) {
      dispatch(subscriberEditRequest(match.params.id))
    }
  }

  loadCalendars() {
    const {dispatch} = this.props

    dispatch(list())
  }

  onChange(name, value) {
    const { errors } = this.validator

    this.setState({ subscriber: { ...this.state.subscriber, [name]: value} })

    errors.remove(name)

    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }

  onSubmit(e) {
    e.preventDefault()
    const subscriber = this.state.subscriber
    const {errors} = this.validator

    this.validator.validateAll(subscriber)
      .then((success) => {
        if (success) {
          this.setState({
            submitted: true
          })
          this.submit(subscriber)
        } else {
          this.setState({errors})
        }
      })
  }

  submit(subscriber) {
    this.props.dispatch(subscriberUpdateRequest(subscriber))
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
      return (<Redirect to="/subscribers"/>);
    }

    const {calendarList} = this.props

    if (!_.isNil(this.state.subscriber.id) && !_.isEmpty(calendarList)) {
      const props = {
        ...this.state,
        calendarList
      }

      return <div className="animated fadeIn">
        <Form {...props}
              onChange={this.onChange}
              onSubmit={this.onSubmit}/>
      </div>
    } else {
      return <div className="animated fadeIn">
        <LoadingComponent/>
      </div>
    }
  }
}

export default Page
