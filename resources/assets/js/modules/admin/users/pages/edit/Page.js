// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getUser, userUpdateRequest, getCompany } from '../../service'
import ReeValidate from 'ree-validate'
import {Redirect} from 'react-router-dom'


// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'UserPage'
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
        companyId: 'required',
        name: 'required|min:6',
        email: 'required|email',
        password: 'min:6',
        passwordConfirmation: 'min:6',
        role : 'required',
        status: 'required'
    })
    const user = this.props.user

    this.state = {
        user,
        companies: this.props.companies,
        credentials: {
            companyId: '',
            userId : user.id,
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            role : 'user',
            changePassword: 1,
            status : 'active'
        },
        checkPassword: false,
        toUsers: false,
        statusList : ['active', 'inactive'],
        roleList : ['company', 'user'],
        errors: this.validator.errors
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkPasswordChange = this.checkPasswordChange.bind(this)
  }
  componentDidMount() {
    const {dispatch, user} = this.props;
    if(this.props.companies.length  == 0){
      dispatch(getCompany())
      .then(res => {
          this.setState({companies: res.companies})
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
    let params = {
      id: user.id
    }
    dispatch(getUser(params))
  }
  
  componentWillReceiveProps(nextProps) {
    const user = nextProps.user

    if (!_.isEqual(this.state.user, user)) {

      this.setState({ user })
      this.setState({
          credentials: {
              companyId: user.companyId,
              userId : user.id,
              name: user.name,
              email: user.email,
              password: '',
              passwordConfirmation: '',
              role: user.role,
              changePassword: 0,
              status: user.status
          }
      });
    }
  }
  checkPasswordChange() {
      this.setState({checkPassword : !this.state.checkPassword});
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
      if(credentials.companyId == 0){
          errors.add('companyId', 'The company field is required.');
          return;
      }

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
            let data = {
                companyId: credentials.companyId,
                userId: credentials.userId,
                name: credentials.name,
                email: credentials.email,
                role: credentials.role,
                status: credentials.status,
                changePassword: 0
            }

            if(this.state.checkPassword == true){
                data.password = credentials.password;
                data.passwordConfirmation = credentials.passwordConfirmation;
                data.changePassword = 1;
            }
          this.submit(data)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(data) {
    this.props.dispatch(userUpdateRequest(data))
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
      if(this.state.toUsers){
          return (<Redirect to="/super/users"/>);
      }
      return <div className="add-user animated fadeIn">
          <Form {...this.state}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                checkPasswordChange={this.checkPasswordChange}
          />
      </div>
  }
}

export default Page
