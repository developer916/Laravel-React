import React from 'react'
import PropTypes from 'prop-types'
import {Trans, withTranslation } from 'react-i18next';
import { Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup } from 'reactstrap';

const displayName = 'RegisterFrom'

const propTypes = {
  email: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const Form = ({ email, errors, handleChange, handleSubmit, t }) => {
  return (<form className="register-form" onSubmit={handleSubmit} noValidate>
    <Card className="mx-4">
      <CardBody className="p-4">
        <h1><Trans i18nKey="header.forgot_password"/>?</h1>
        <p className="text-muted"><Trans i18nKey="auth.please_input_your_email_address"/></p>
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
        <Button color="primary" block><Trans i18nKey="common.submit"/></Button>
      </CardBody>
    </Card>
  </form>)
}

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
