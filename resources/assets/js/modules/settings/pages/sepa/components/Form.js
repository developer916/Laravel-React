import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardBody, Button, Input, InputGroup,FormGroup, Label} from 'reactstrap';
import { Trans , withTranslation} from 'react-i18next';

const displayName = 'SepaFrom'

const propTypes = {
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const Form = ({company, errors, handleChange, handleSubmit, t }) => {
  return (<form className="sepa-form" onSubmit={handleSubmit} noValidate>
    <Card className="mx-4">
      <CardBody className="p-4">
        <h1><Trans i18nKey="common.sepa_of_company"/></h1>
        <p className="text-muted"><Trans i18nKey="auth.fill_out_the_information_of_your_company"/></p>
        <FormGroup>
          <Label><Trans i18nKey="auth.iban"/> </Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="iban"
                   className={`${errors.has('iban') && 'is-invalid'}`}
                   placeholder={t('auth.iban')}
                   value={company.iban || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required
                   autoFocus/>
            {errors.has('iban') && <div className="invalid-feedback">{errors.first('iban')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="auth.bic"/> </Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="bic"
                   className={`${errors.has('bic') && 'is-invalid'}`}
                   placeholder={t('auth.bic')}
                   value={company.bic || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('bic') && <div className="invalid-feedback">{errors.first('bic')}</div>}
          </InputGroup>
        </FormGroup>
        <Button color="primary" block style={{ width: 150, float: "right" }} ><Trans i18nKey="auth.store_sepa"/></Button>
      </CardBody>
    </Card>
  </form>)
}

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
