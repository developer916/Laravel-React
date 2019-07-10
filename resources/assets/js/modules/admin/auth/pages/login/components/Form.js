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
    <Card className="p-4">
      <CardBody>
        <h1><Trans i18nKey="admin.super_login"/></h1>
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
                 required
                 autoFocus/>
          {errors.has('password') && <div className="invalid-feedback">{errors.first('password')}</div>}
        </InputGroup>
        <Row className="float-right">
          <Col xs="6">
            <Button type="submit" color="primary" className="px-4"><Trans i18nKey="header.login"/></Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </form>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
