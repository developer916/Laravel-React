import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {Trans, withTranslation } from 'react-i18next';

import { Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup } from 'reactstrap';

const displayName = 'RegisterFrom'

const propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const Form = ({ name, email, password, passwordConfirmation, errors, handleChange, handleSubmit, t }) => {
  return (<form className="register-form" onSubmit={handleSubmit} noValidate>
    <Card className="mx-4">
      <CardBody className="p-4">
        <h1><Trans i18nKey="header.register"/></h1>
        <p className="text-muted"><Trans i18nKey="auth.create_your_company_account"/></p>
        <InputGroup className="mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="icon-user"></i>
            </span>
          </div>
          <Input type="text"
                 name="name"
                 className={`${errors.has('name') && 'is-invalid'}`}
                 placeholder={t('auth.user_name')}
                 value={name || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required
                 autoFocus/>
          {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
        </InputGroup>
        <InputGroup className="mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">@</span>
          </div>
          <Input type="email"
                 name="email"
                 className={`${errors.has('email') && 'is-invalid'}`}
                 placeholder={t('common.email')}
                 value={email || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required/>
          {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
        </InputGroup>
        <InputGroup className="mb-3">
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
        <InputGroup className="mb-4">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="icon-lock"></i>
            </span>
          </div>
          <Input type="password"
                 name="passwordConfirmation"
                 className={`${errors.has('passwordConfirmation') && 'is-invalid'}`}
                 placeholder={t('common.confirm_password')}
                 value={passwordConfirmation || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required/>
          {errors.has('passwordConfirmation') && <div className="invalid-feedback">{errors.first('passwordConfirmation')}</div>}
        </InputGroup>
        <Button color="primary" block><Trans i18nKey="auth.create_account"/></Button>
      </CardBody>
    </Card>
  </form>)
}

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
