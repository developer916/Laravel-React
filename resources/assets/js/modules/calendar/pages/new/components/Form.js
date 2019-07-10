import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, CardBody, Button, Input, CardHeader, FormGroup, Label } from 'reactstrap';
import {Trans, withTranslation } from 'react-i18next';
import Select from 'react-select';

const displayName = 'AddNewCalendarForm';
const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  is_private: PropTypes.bool,
  is_email_necessary: PropTypes.bool,
  is_offline: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  background: PropTypes.any,
  handleMultiSelectChange : PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  getError:  PropTypes.bool,
};

const Form = ({ name, description, is_private, is_email_necessary, is_offline, errors, categories, handleMultiSelectChange, handleSubmit, handleChange, getError, t }) => (
  <form onSubmit={handleSubmit} noValidate>
    <Card className="p-4">
      {/*<CardHeader>*/}
        {/*Add New Calendar*/}
      {/*</CardHeader>*/}
      <CardBody>
        <h1><Trans i18nKey="calendars.add_new_calendar"/></h1>
        <Row>
          <Col xs="12">
              {(() => {
                  if(getError == true) {
                      return (
                          <div className="alert alert-danger" role="alert" style={{marginTop: '15px'}}>
                            <Trans i18nKey="calendars.can_not_create_new_calendar"/>
                          </div>
                      )
                  }
              })()}
          </Col>
        </Row>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="calendar-name"><Trans i18nKey="calendars.calendar_name"/></Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="name"
                   id="calendar-name"
                   className={`${errors.has('name') && 'is-invalid'}`}
                   placeholder={t('calendars.calendar_name')}
                   value={name || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required
                   autoFocus/>
            {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="textarea-input"><Trans i18nKey="common.description"/></Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="textarea" name="description" id="textarea-input" rows="9" value={description || ''}
                   className={`${errors.has('description') && 'is-invalid'}`}
                   placeholder={t('common.description')} onChange={e => handleChange(e.target.name, e.target.value)} required/>
            {errors.has('description') && <div className="invalid-feedback">{errors.first('description')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3"><Label><Trans i18nKey="common.category"/></Label></Col>
          <Col md="9">
            <Select
                isMulti
                name="categories"
                options={categories}
                placeholder={t('common.category')}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleMultiSelectChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3"><Label><Trans i18nKey="calendars.options"/></Label></Col>
          <Col md="9">
            <FormGroup check className="checkbox">
              <Input className="form-check-input" type="checkbox" id="checkbox1" name="is_private"
                     checked={is_private} onChange={e => handleChange(e.target.name, !is_private)}/>
              <Label check className="form-check-label" htmlFor="checkbox1"><Trans i18nKey="calendars.calendar_is_private"/></Label>
            </FormGroup>
            <FormGroup check className="checkbox">
              <Input className="form-check-input" type="checkbox" id="checkbox2" name="is_email_necessary"
                     checked={is_email_necessary} onChange={e => handleChange(e.target.name, !is_email_necessary)}/>
              <Label check className="form-check-label" htmlFor="checkbox2"><Trans i18nKey="calendars.user_email_required"/></Label>
            </FormGroup>
            <FormGroup check className="checkbox">
              <Input className="form-check-input" type="checkbox" id="checkbox3" name="is_offline"
                     checked={is_offline} onChange={e => handleChange(e.target.name, !is_offline)}/>
              <Label check className="form-check-label" htmlFor="checkbox3"><Trans i18nKey="calendars.calendar_is_offline"/></Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="file-input"><Trans i18nKey="calendars.background_image"/></Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="file" id="file-input" name="background"
                   className={`${errors.has('background') && 'is-invalid'}`}
                   onChange={e => handleChange(e.target.name, e.target.files)}/>
            {errors.has('background') && <div className="invalid-feedback">{errors.first('background')}</div>}
          </Col>
        </FormGroup>
        <Row>
          <Col xs="12">
            <Button type="submit" color="primary" className="px-4"><Trans i18nKey="common.submit"/></Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </form>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default withTranslation()(Form)
