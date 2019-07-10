import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Card, CardBody,
  Button,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import {Trans, withTranslation} from 'react-i18next';

const displayName = 'EditLicenseForm';
const propTypes = {
  license: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Form = ({ license, errors, onSubmit, onChange , t }) => {
  function handleChange(name, value) {
    switch (name) {
      case 'enabledHtml':
      case 'enabledWebsite':
      case 'enabledSocial':
        value = (1 - license[name])
        break;
      case 'enabledFunction':
        value = (license[name] === 'off' ? 'on' : 'off')
        break;
    }
    onChange(name, value)
  }

  function renderBody() {
    return (
      <CardBody className="p-4">
        <h1><Trans i18nKey="admin.edit_license_model"/></h1>
        <p className="text-muted"><Trans i18nKey="admin.edit_license_model_description"/></p>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="common.name"/> *</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="name"
                   className={`${errors.has('name') && 'is-invalid'}`}
                   placeholder={t('common.name')}
                   value={license.name || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required
                   autoFocus/>
            {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="common.description"/> *</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="description"
                   className={`${errors.has('description') && 'is-invalid'}`}
                   placeholder={t('common.description')}
                   value={license.description || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('description') && <div className="invalid-feedback">{errors.first('description')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="admin.price"/> *</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="price"
                   className={`${errors.has('price') && 'is-invalid'}`}
                   placeholder={t('admin.price')}
                   value={license.price || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('price') && <div className="invalid-feedback">{errors.first('price')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="admin.number_of_calendars"/> *</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="numberOfCalendars"
                   className={`${errors.has('numberOfCalendars') && 'is-invalid'}`}
                   placeholder={t('admin.number_of_calendars')}
                   value={license.numberOfCalendars || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('numberOfCalendars') && <div className="invalid-feedback">{errors.first('numberOfCalendars')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="admin.number_of_events"/> *</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="numberOfEvents"
                   className={`${errors.has('numberOfEvents') && 'is-invalid'}`}
                   placeholder={t('admin.number_of_events')}
                   value={license.numberOfEvents || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('numberOfEvents') && <div className="invalid-feedback">{errors.first('numberOfEvents')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="admin.number_of_subscribers"/> *</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="numberOfSubscribers"
                   className={`${errors.has('numberOfSubscribers') && 'is-invalid'}`}
                   placeholder={t('admin.number_of_subscribers')}
                   value={license.numberOfSubscribers || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('numberOfSubscribers') && <div className="invalid-feedback">{errors.first('numberOfSubscribers')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="admin.enable_email"/> ?</Label>
          </Col>
          <Col xs="12" md="9">
            <Label className="switch switch-3d switch-primary">
              <Input type="checkbox"
                     name="enabledHtml"
                     className="switch-input"
                     onChange={e => handleChange(e.target.name, e.target.value)}
                     defaultChecked={license.enabledHtml === 1}/>
              <span className="switch-label"></span>
              <span className="switch-handle"></span>
            </Label>
            {errors.has('enabledHtml') && <div className="invalid-feedback">{errors.first('enabledHtml')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="admin.enable_website"/> ?</Label>
          </Col>
          <Col xs="12" md="9">
            <Label className="switch switch-3d switch-primary">
              <Input type="checkbox"
                     name="enabledWebsite"
                     className="switch-input"
                     onChange={e => handleChange(e.target.name, e.target.value)}
                     defaultChecked={license.enabledWebsite === 1}/>
              <span className="switch-label"></span>
              <span className="switch-handle"></span>
            </Label>
            {errors.has('enabledWebsite') && <div className="invalid-feedback">{errors.first('enabledWebsite')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="admin.enable_social"/> ?</Label>
          </Col>
          <Col xs="12" md="9">
            <Label className="switch switch-3d switch-primary">
              <Input type="checkbox"
                     name="enabledSocial"
                     className="switch-input"
                     onChange={e => handleChange(e.target.name, e.target.value)}
                     defaultChecked={license.enabledSocial === 1}/>
              <span className="switch-label"></span>
              <span className="switch-handle"></span>
            </Label>
            {errors.has('enabledSocial') && <div className="invalid-feedback">{errors.first('enabledSocial')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="admin.enable_editor"/> ?</Label>
          </Col>
          <Col xs="12" md="9">
            <Label className="switch switch-3d switch-primary">
              <Input type="checkbox"
                     name="enabledFunction"
                     className="switch-input"
                     onChange={e => handleChange(e.target.name, e.target.value)}
                     defaultChecked={license.enabledFunction === 'on'}/>
              <span className="switch-label"></span>
              <span className="switch-handle"></span>
            </Label>
            {errors.has('enabledFunction') && <div className="invalid-feedback">{errors.first('enabledFunction')}</div>}
          </Col>
        </FormGroup>
        <Button type="submit" color="success" block style={{ width: 150, float: "right" }}><Trans i18nKey="admin.update_license"/></Button>
      </CardBody>
    )
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
