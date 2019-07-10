import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardBody, Button, Input, InputGroup,FormGroup, Label} from 'reactstrap';
import { Trans , withTranslation} from 'react-i18next';

const displayName = 'SMTPFrom'

const propTypes = {
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const Form = ({company, errors, handleChange, handleSubmit, t }) => {
  return (<form className="smtp-form" onSubmit={handleSubmit} noValidate>
    <Card className="mx-4">
      <CardBody className="p-4">
        <h1><Trans i18nKey="settings.smtp_setting"/></h1>
        <p className="text-muted"><Trans i18nKey="auth.fill_out_the_information_of_your_company"/> </p>
        <FormGroup>
          <Label><Trans i18nKey="settings.smtp_server"/> </Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="smtpServer"
                   className={`${errors.has('smtpServer') && 'is-invalid'}`}
                   placeholder={t('settings.smtp_server')}
                   value={company.smtpServer || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required
                   autoFocus/>
            {errors.has('smtpServer') && <div className="invalid-feedback">{errors.first('smtpServer')}</div>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label><Trans i18nKey="settings.smtp_user"/> </Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="smtpUser"
                   className={`${errors.has('smtpUser') && 'is-invalid'}`}
                   placeholder={t('settings.smtp_user')}
                   value={company.smtpUser || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('smtpUser') && <div className="invalid-feedback">{errors.first('smtpUser')}</div>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label><Trans i18nKey="settings.smtp_password"/> </Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="smtpPassword"
                   className={`${errors.has('smtpPassword') && 'is-invalid'}`}
                   placeholder={t('settings.smtp_password')}
                   value={company.smtpPassword || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
              {errors.has('smtpPassword') && <div className="invalid-feedback">{errors.first('smtpPassword')}</div>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label><Trans i18nKey="settings.smtp_from_email"/></Label>
          <InputGroup className="mb-3">
            <Input type="email"
                   name="smtpFromEmail"
                   className={`${errors.has('smtpFromEmail') && 'is-invalid'}`}
                   placeholder={t('settings.smtp_from_email')}
                   value={company.smtpFromEmail || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
              {errors.has('smtpFromEmail') && <div className="invalid-feedback">{errors.first('smtpFromEmail')}</div>}
          </InputGroup>
        </FormGroup>

        <Button color="primary" block style={{ width: 150, float: "right" }} ><Trans i18nKey="settings.store_smtp"/></Button>
      </CardBody>
    </Card>
  </form>)
}

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
