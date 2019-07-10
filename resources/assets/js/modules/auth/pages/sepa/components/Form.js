import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {Trans, withTranslation } from 'react-i18next';

import { Card, CardBody, Button, Input, InputGroup } from 'reactstrap';

const displayName = 'SepaFrom'

const propTypes = {
  userId: PropTypes.number.isRequired,
  iban: PropTypes.string.isRequired,
  bic: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const Form = ({ userId, iban, bic, errors, handleChange, handleSubmit, t }) => {
  return (<form className="address-form" onSubmit={handleSubmit} noValidate>
    <Card className="mx-4">
      <CardBody className="p-4">
        <h1><Trans i18nKey="common.sepa_of_company"/></h1>
        <p className="text-muted"><Trans i18nKey="auth.fill_out_the_information_of_your_company"/></p>
        <input type="hidden" name="userId" value={userId} readOnly/>
        <InputGroup className="mb-3">
          <Input type="text"
                 name="iban"
                 className={`${errors.has('iban') && 'is-invalid'}`}
                 placeholder={t('auth.iban')}
                 value={iban || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required
                 autoFocus/>
          {errors.has('iban') && <div className="invalid-feedback">{errors.first('iban')}</div>}
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="text"
                 name="bic"
                 className={`${errors.has('bic') && 'is-invalid'}`}
                 placeholder={t('auth.bic')}
                 value={bic || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required/>
          {errors.has('bic') && <div className="invalid-feedback">{errors.first('bic')}</div>}
        </InputGroup>
        <Button color="primary" block><Trans i18nKey="auth.store_sepa"/></Button>
      </CardBody>
    </Card>
  </form>)
}

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
