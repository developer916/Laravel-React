import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';

import { Card, CardBody, Button, Input, InputGroup,FormGroup, Label } from 'reactstrap';
import { Trans , withTranslation} from 'react-i18next';

// import quill stylesheet
import 'quill/dist/quill.snow.css';

const displayName = 'AddressFrom'

const propTypes = {
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDescChange: PropTypes.func.isRequired,
}

const Form = ({company, errors, handleChange, handleDescChange, handleSubmit, t }) => {
  let quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ]
  }

  return (<form className="address-form" onSubmit={handleSubmit} noValidate>
    <Card className="mx-4">
      <CardBody className="p-4">
        <h1><Trans i18nKey="common.address_of_company"/></h1>
        <p className="text-muted"><Trans i18nKey="auth.fill_out_the_information_of_your_company"/></p>
        <FormGroup>
          <Label><Trans i18nKey="auth.name_of_company"/></Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="name"
                   className={`${errors.has('name') && 'is-invalid'}`}
                   placeholder={t('auth.name_of_company')}
                   value={company.name || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required
                   autoFocus/>
              {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="auth.street_name_and_number"/></Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="street"
                   className={`${errors.has('street') && 'is-invalid'}`}
                   placeholder={t('auth.street_name_and_number')}
                   value={company.street || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('street') && <div className="invalid-feedback">{errors.first('street')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="auth.postal_code"/></Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="postalCode"
                   className={`${errors.has('postalCode') && 'is-invalid'}`}
                   placeholder={t('auth.postal_code')}
                   value={company.postalCode || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('postalCode') && <div className="invalid-feedback">{errors.first('postalCode')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="auth.city"/></Label>
          <InputGroup className="mb-4">
            <Input type="text"
                   name="city"
                   className={`${errors.has('city') && 'is-invalid'}`}
                   placeholder={t('auth.city')}
                   value={company.city || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('city') && <div className="invalid-feedback">{errors.first('city')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="auth.country"/> </Label>
          <InputGroup className="mb-4">
            <Input type="text"
                   name="country"
                   className={`${errors.has('country') && 'is-invalid'}`}
                   placeholder={t('auth.country')}
                   value={company.country || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('country') && <div className="invalid-feedback">{errors.first('country')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="auth.phone_number"/></Label>
          <InputGroup className="mb-4">
            <Input type="text"
                   name="phone"
                   className={`${errors.has('phone') && 'is-invalid'}`}
                   placeholder={t('auth.phone_number')}
                   value={company.phone || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('phone') && <div className="invalid-feedback">{errors.first('phone')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="common.email"/> </Label>
          <InputGroup className="mb-3">
            <Input type="email"
                   name="email"
                   className={`${errors.has('email') && 'is-invalid'}`}
                   placeholder={t('common.email')}
                   value={company.email || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}/>
            {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="auth.website_url"/></Label>
          <InputGroup className="mb-4">
            <Input type="text"
                   name="website"
                   className={`${errors.has('website') && 'is-invalid'}`}
                   placeholder={t('auth.website_url')}
                   value={company.website || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}/>
            {errors.has('website') && <div className="invalid-feedback">{errors.first('website')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="auth.tax_id"/> </Label>
          <InputGroup className="mb-4">
            <Input type="text"
                   name="taxId"
                   className={`${errors.has('taxId') && 'is-invalid'}`}
                   placeholder={t('auth.tax_id')}
                   value={company.taxId || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}/>
            {errors.has('taxId') && <div className="invalid-feedback">{errors.first('taxId')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="common.description"/> </Label>
          <div className="mb-4">
            <ReactQuill value={company.description}
                        onChange={handleDescChange}
                        modules={quillModules}
                        placeholder={t('common.description')}/>
          </div>
        </FormGroup>
        <Button color="primary" block style={{ width: 150, float: "right" }} ><Trans i18nKey="auth.store_information"/></Button>
      </CardBody>
    </Card>
  </form>)
}

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
