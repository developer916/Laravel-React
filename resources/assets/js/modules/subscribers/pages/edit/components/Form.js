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
import { Trans, withTranslation} from "react-i18next";

const displayName = 'EditLicenseForm';
const propTypes = {
  calendarList: PropTypes.array.isRequired,
  subscriber: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Form = ({ calendarList, subscriber, errors, onSubmit, onChange, t }) => {
  function handleChange(name, value) {
    if (name === 'status') {
      value = (subscriber[name] === 'off' ? 'on' : 'off')
    }
    onChange(name, value)
  }

  function renderBody() {
    const renderCalOptions = (cals) => {
      return cals.map(cal => {
        return <option value={cal.id} key={cal.id}>{cal.name}</option>
      })
    }

    return (
      <CardBody className="p-4">
        <h1><Trans i18nKey="subscribers.edit_subscriber"/></h1>
        <p className="text-muted"><Trans i18nKey="subscribers.edit_the_information_of_subscriber"/></p>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="common.name"/></Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="name"
                   className={`${errors.has('name') && 'is-invalid'}`}
                   placeholder={t('common.name')}
                   value={subscriber.name || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   autoFocus
                   required/>
            {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="common.email"/></Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="email"
                   className={`${errors.has('email') && 'is-invalid'}`}
                   placeholder={t('common.email')}
                   value={subscriber.email || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="calendars.calendars"/></Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select"
                   name="calendarId"
                   value={subscriber.calendarId || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}>
              {renderCalOptions(calendarList)}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="common.description"/></Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text"
                   name="description"
                   className={`${errors.has('description') && 'is-invalid'}`}
                   placeholder={t('common.description')}
                   value={subscriber.description || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('description') && <div className="invalid-feedback">{errors.first('description')}</div>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input"><Trans i18nKey="common.status"/></Label>
          </Col>
          <Col xs="12" md="9">
            <Label className="switch switch-3d switch-primary">
              <Input type="checkbox"
                     name="status"
                     className="switch-input"
                     onChange={e => handleChange(e.target.name, e.target.value)}
                     defaultChecked={subscriber.status === 'on'}/>
              <span className="switch-label"></span>
              <span className="switch-handle"></span>
            </Label>
            {errors.has('status') && <div className="invalid-feedback">{errors.first('status')}</div>}
          </Col>
        </FormGroup>
        <Button type="submit" color="primary" block style={{ width: 150, float: "right" }}><Trans i18nKey="subscribers.update_subscriber"/></Button>
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
