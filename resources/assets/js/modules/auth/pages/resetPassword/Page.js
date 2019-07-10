//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {resetPassword} from '../../service'
import ReeValidate from 'ree-validate'
import {Trans, withTranslation} from 'react-i18next';
import {Redirect} from 'react-router-dom';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

// import components
import Form from './components/Form'

// initialize component
class Page extends Component {
  static displayName = 'ResetPassword';
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      password: 'required|min:6',
      passwordConfirmation: 'required|min:6'
    });

    this.state = {
      credentials: {
        password: '',
        passwordConfirmation: '',
        token: ''
      },
      errors: this.validator.errors,
      fields: this.validator.fields,
      showSuccessModal: false,
      redirectCheck: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      credentials: {
        password: '',
        passwordConfirmation: '',
        token: this.props.match.params.token
      }
    })
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
    const { credentials } = this.state;
    const { errors } = this.validator;

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
    this.props.dispatch(resetPassword(credentials))
      .then(res => {
        if (res === 'success') {
          this.openSuccessModal();
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

  openSuccessModal() {
    if(this.state.showSuccessModal == true){
        this.setState({
            showSuccessModal: !this.state.showSuccessModal,
            redirectCheck: true
        });

    } else{
        this.setState({
            showSuccessModal: !this.state.showSuccessModal,
        });
    }

  }

  render() {

    const { password, passwordConfirmation } = this.state.credentials
    const props = {
      password,
      passwordConfirmation,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    };
    const { redirectCheck } = this.state
    if (redirectCheck) {
        return <Redirect to= '/' />;
    }

    return (<div className="app flex-row align-items-center set-min-height" >
      <Container>
        <Modal isOpen={this.state.showSuccessModal} toggle={() => this.openSuccessModal()}
               className={'modal-primary'}>
          <ModalHeader toggle={() => this.openSuccessModal()}><Trans i18nKey="auth.success"/></ModalHeader>
          <ModalBody>
            <Trans i18nKey="auth.password_reset_success"/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.openSuccessModal()}><Trans i18nKey="common.ok"/></Button>
          </ModalFooter>
        </Modal>
        <Row className="justify-content-center">
          <Col md="6">
            <Form {...props}  />
          </Col>
        </Row>
      </Container>
    </div>)
  }
}

export default withTranslation()(Page)
