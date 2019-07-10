// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { addUser } from '../../service'
import ReeValidate from 'ree-validate'
import {Redirect} from 'react-router-dom'

// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'UserAddPage'
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
        name: 'required|min:6',
        email: 'required|email',
        password: 'required|min:6',
        passwordConfirmation: 'required|min:6',
        status: 'required'
    })
    
    const user = this.props.user.toJson()
    
    this.state = {
      user,
      credentials: {
          companyId: this.props.companyId,
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          role : 'user',
          changePassword: 1,
          status : 'active'
      },
      toUsers: false,
      statusList : ['active', 'inactive'],
      errors: this.validator.errors
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    // const user = nextProps.user.toJson()
    //
    // if (!_.isEqual(this.state.user, user)) {
    //   this.setState({ user })
    // }
    
  }
  
  handleChange(name, value) {
    const { errors } = this.validator
    
    this.setState({ credentials: { ...this.state.credentials, [name]: value} })
    
    errors.remove(name)
    
    this.validator.validate(name, value)
      .then(() => {
          this.setState({ errors })
      })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    const credentials = this.state.credentials
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
    this.props.dispatch(addUser(credentials))
       .then(res => {
         if (res.status == 'success') {
            this.setState({toUsers: true});
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
  
  render() {
      if(this.props.role == "user"){
          return (<Redirect to="/calendars"/>);
      }

      if(this.state.toUsers){
          return (<Redirect to="/users"/>);
      }
    return <div className="add-user animated fadeIn">
        <Form {...this.state}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}/>
      </div>
  }
}

export default Page
