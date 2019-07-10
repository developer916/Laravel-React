//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import {Trans, withTranslation } from 'react-i18next';

import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap'

// import components

// initialize component
class Page extends Component {
  static displayName = 'SepaPage'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    confirmationLink: PropTypes.string.isRequired,
  }
  
  constructor(props) {
    super(props)
  }
  
  render() {
    // check if sepa is not created then redirect him to register/sepa page
    if (this.props.confirmationLink === '') {
      return <Redirect to="/register" />
    }

    return (<div className="app flex-row align-items-center set-min-height" >
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Card className="mx-4 card-accent-primary">
              <CardHeader style={{ textAlign: 'center', fontSize: '17px' }}>
                <Trans i18nKey="auth.thanks_for_your_registering_a_new_account"/>
              </CardHeader>
              <CardBody>
                <p><Trans i18nKey="auth.confirm_description_1"/></p>
                <p><Trans i18nKey="auth.confirm_description_2"/></p>
                <p><Trans i18nKey="auth.confirm_description_3"/> <Link to="/login"><Trans i18nKey="auth.confirm_description_4"/></Link>  <Trans i18nKey="auth.confirm_description_5"/> </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>)
  }
}

export default withTranslation()(Page)
