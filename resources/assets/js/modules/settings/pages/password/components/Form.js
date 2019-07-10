import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardBody, Button, Input, InputGroup,FormGroup, Label} from 'reactstrap';
import { Trans , withTranslation} from 'react-i18next';

const displayName = 'PasswordFrom'

const propTypes = {
  credentials: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const Form = ({credentials, errors, handleChange, handleSubmit, t }) => {
  return (<form className="smtp-form" onSubmit={handleSubmit} noValidate>
    <Card className="mx-4">
      <CardBody className="p-4">
        <h1><Trans i18nKey="settings.password_management"/></h1>
        <FormGroup>
          <Label><Trans i18nKey="settings.current_password"/> </Label>
          <InputGroup className="mb-3">
            <Input type="password"
                   name="current_password"
                   className={`${errors.has('current_password') && 'is-invalid'}`}
                   placeholder={t('settings.current_password')}
                   value={credentials.current_password || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required
                   autoFocus/>
            {errors.has('current_password') && <div className="invalid-feedback">{errors.first('current_password')}</div>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label><Trans i18nKey="settings.new_password"/> </Label>
          <InputGroup className="mb-3">
            <Input type="password"
                   name="password"
                   className={`${errors.has('password') && 'is-invalid'}`}
                   placeholder={t('settings.new_password')}
                   value={credentials.password || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('password') && <div className="invalid-feedback">{errors.first('password')}</div>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label><Trans i18nKey="settings.confirm_new_password"/> </Label>
          <InputGroup className="mb-3">
            <Input type="password"
                   name="password_confirmation"
                   className={`${errors.has('password_confirmation') && 'is-invalid'}`}
                   placeholder={t('settings.confirm_new_password')}
                   value={credentials.password_confirmation || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
              {errors.has('password_confirmation') && <div className="invalid-feedback">{errors.first('password_confirmation')}</div>}
          </InputGroup>
        </FormGroup>


        <Button color="primary" block style={{ width: 150, float: "right" }} ><Trans i18nKey="settings.store_password"/></Button>
      </CardBody>
    </Card>
  </form>)
}

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
