import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, Button, Input, InputGroup, Label, FormGroup } from 'reactstrap';
import ReactQuill from 'react-quill';

// import quill stylesheet
import 'quill/dist/quill.snow.css';
import {Trans , withTranslation} from 'react-i18next';


const displayName = 'AddNewCompanyForm';
const propTypes = {
  company: PropTypes.object.isRequired,
  formStep: PropTypes.number.isRequired,
  errors: PropTypes.object.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onDescChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Form = ({ company, formStep, errors, onNextStep, onPrevStep, onDescChange, onSubmit, onChange, t }) => {
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

  function handleChange(name, value) {
    if (value !== company[name]) {
      onChange(name, value)
    }
  }

  function renderBody() {
    if (formStep === 1) {
      return (
        <CardBody className="p-4">
          <h1><Trans i18nKey="common.address_of_company"/></h1>
          <p className="text-muted"><Trans i18nKey="auth.fill_out_the_information_of_your_company"/></p>
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
          <InputGroup className="mb-3">
            <Input type="email"
                   name="email"
                   className={`${errors.has('email') && 'is-invalid'}`}
                   placeholder={t('common.email')}
                   value={company.email || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}/>
            {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
          </InputGroup>
          <InputGroup className="mb-4">
            <Input type="text"
                   name="website"
                   className={`${errors.has('website') && 'is-invalid'}`}
                   placeholder={t('auth.website_url')}
                   value={company.website || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}/>
            {errors.has('website') && <div className="invalid-feedback">{errors.first('website')}</div>}
          </InputGroup>
          <InputGroup className="mb-4">
            <Input type="text"
                   name="taxId"
                   className={`${errors.has('taxId') && 'is-invalid'}`}
                   placeholder={t('auth.tax_id')}
                   value={company.taxId || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}/>
            {errors.has('taxId') && <div className="invalid-feedback">{errors.first('taxId')}</div>}
          </InputGroup>
          <div className="mb-4">
            <ReactQuill value={company.description}
                        onChange={onDescChange}
                        modules={quillModules}
                        placeholder={t('common.description')}/>
          </div>
          <Button color="primary" block style={{ width: 150, float: "right" }} onClick={e => onNextStep(e)}><Trans i18nKey="admin.next_step"/></Button>
        </CardBody>
      )
    } else {
      return (<CardBody>
        <h1><Trans i18nKey="common.sepa_of_company"/></h1>
        <p className="text-muted"><Trans i18nKey="auth.fill_out_the_information_of_your_company"/></p>
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
        <FormGroup check>
          <Input className="form-check-input"
                 type="checkbox"
                 name="status"
                 value={company.status === "active" ? "inactive" : "active"}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 checked={company.status === "active"}/>
          <Label className="form-check-label" check htmlFor="status"><Trans i18nKey="auth.check_to_active"/></Label>
        </FormGroup>
        <Button type="submit" color="success" block style={{ width: 150, float: "right" }}><Trans i18nKey="admin.store_company"/></Button>
        <Button color="primary" block style={{ width: 150, float: "left" }} onClick={e => onPrevStep(e)}><Trans i18nKey="admin.previous_step"/></Button>
      </CardBody>)
    }
  }

  return (<form className="company-form" onSubmit={e => onSubmit(e)} noValidate>
    <Card>
      { renderBody() }
    </Card>
  </form>)
};

Form.displayName = displayName;
Form.propTypes = propTypes;


export default withTranslation()(Form)
