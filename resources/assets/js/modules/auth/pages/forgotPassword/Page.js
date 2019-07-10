//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {forgotPassword} from '../../service'
import ReeValidate from 'ree-validate'
import {Trans, withTranslation } from 'react-i18next';
import {Redirect} from 'react-router-dom';
import { Container, Row, Col, ModalFooter, Modal, ModalBody, ModalHeader, Button } from 'reactstrap'

// import components
import Form from './components/Form'

// initialize component
class Page extends Component {
  static displayName = 'ForgotPassword';
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.validator = new ReeValidate({
      email: 'required|email',
    });

    this.state = {
      credentials: {
        email: '',
      },
      errors: this.validator.errors,
      fields: this.validator.fields,
      showSuccessModal: false,
      redirectCheck : false,
    };


    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // event to handle input change
  handleChange(name, value) {
    const { errors } = this.validator;

    this.setState({credentials: { ...this.state.credentials, [name]: value }})
    errors.remove(name);

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
    this.props.dispatch(forgotPassword(credentials))
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
    } else {
        this.setState({
            showSuccessModal: !this.state.showSuccessModal,
        });
    }

  }


  render() {
    const { email } = this.state.credentials
    const props = {
      email,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    }
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
            <Trans i18nKey="auth.success_dialog_message"/>
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
