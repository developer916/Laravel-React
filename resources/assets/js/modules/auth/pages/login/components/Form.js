import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {Trans, withTranslation } from 'react-i18next';

import { Row, CardGroup, Col, Card, CardBody, Button, Input, InputGroup } from 'reactstrap';

const displayName = 'LoginForm'
const propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

const Form = ({ email, password, errors, handleChange, handleSubmit, t }) => (
  <form onSubmit={handleSubmit} noValidate>
    <CardGroup className="mb-4">
      <Card className="p-4">
        <CardBody>
          <h1>Login</h1>
          <p className="text-muted"><Trans i18nKey="home.sign_in_to_site"/></p>
          <InputGroup className="mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">@</span>
            </div>
            <Input type="text"
                   name="email"
                   className={`${errors.has('email') && 'is-invalid'}`}
                   placeholder={t('common.email')}
                   value={email || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required
                   autoFocus/>
            {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
          </InputGroup>
          <InputGroup className="mb-4">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="icon-lock"></i>
              </span>
            </div>
            <Input type="password"
                   name="password"
                   className={`${errors.has('password') && 'is-invalid'}`}
                   placeholder={t('common.password')}
                   value={password || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('password') && <div className="invalid-feedback">{errors.first('password')}</div>}
          </InputGroup>
          <Row>
            <Col xs="6">
              <Button type="submit" color="primary" className="px-4"><Trans i18nKey="header.login"/></Button>
            </Col>
            <Col xs="6" className="text-right">
              <Link color="link" className="px-0 btn btn-link" to="/forgot-password"><Trans i18nKey="header.forgot_password"/>?</Link>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
        <CardBody className="text-center">
          <div>
            <h2><Trans i18nKey="header.sign_up"/></h2>
            <p><Trans i18nKey="auth.register_description"/></p>
            <Link color="primary" className="mt-3 btn btn-primary active" to="/register"><Trans i18nKey="auth.register_now"/></Link>
          </div>
        </CardBody>
      </Card>
    </CardGroup>
  </form>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
