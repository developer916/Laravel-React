//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import {activeAccount} from "../../service";
import {Trans, withTranslation } from 'react-i18next';
// import components

// initialize component
class Page extends Component {
  static displayName = 'EmailConfirmPage';
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.state = {
      is_active: false,
      is_failed: false,
      is_loading: false
    }
  }

  componentDidMount() {
    this.setState({is_loading: true});
    this.props.dispatch(activeAccount(this.props.match.params.token))
      .then(res => {
        this.setState({is_active: this.props.isActive, is_loading: false});
      })
      .catch(({error, statusCode}) => {
        this.setState({is_failed: true, is_loading: false})
      })
  }

  renderResult() {
    if (this.state.is_loading) {
      return (
        <CardBody>
          <p><Trans i18nKey="auth.activating_your_account"/></p>
        </CardBody>
      )
    }

    if (this.state.is_active) {
      return (
        <CardBody>
          <p><Trans i18nKey="auth.confirm_description_1"/></p>
          <p><Trans i18nKey="auth.now_your_account_is_activated"/></p>
          <p><Trans i18nKey="auth.confirm_description_3"/> <Link to="/login"><Trans i18nKey="auth.confirm_description_4"/></Link> <Trans i18nKey="auth.confirm_description_5"/></p>
        </CardBody>
      )
    } else {
      return (
        <CardBody>
          <p><Trans i18nKey="auth.account_activation_failed"/></p>
        </CardBody>
      )
    }
  }

  render() {

    return (<div className="app flex-row align-items-center set-min-height" >
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Card className="mx-4 card-accent-primary">
              <CardHeader style={{ textAlign: 'center', fontSize: '17px' }}>
                Thanks for your registering a new account
              </CardHeader>
              {this.renderResult()}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>)
  }
}


const mapStateToProps = state => {
  return {
    isActive: state.auth.isActive
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Page))
