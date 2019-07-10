import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Button, Input, FormGroup, Label, ModalBody, ModalFooter} from 'reactstrap';

import {DatetimePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css'
import {Trans, withTranslation } from 'react-i18next';

const displayName = 'AddNewCalendarForm';
const propTypes = {
  summary: PropTypes.string,
  description: PropTypes.string,
  shortLink: PropTypes.string,
  errors: PropTypes.object.isRequired,
  dateFrom: PropTypes.object,
  dateTo: PropTypes.object,
  eventId: PropTypes.number,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  getError: PropTypes.bool
};


const CreateForm = ({summary, description, shortLink, errors, handleSubmit, handleChange, handleCancel, dateFrom, dateTo, eventId, reminders, units, handleDelete, addNotification, removeNotification, handleNotification, getError, t}) => {
  function renderNotifications(){
    let reminderList = reminders.map((data, i) =>{
      return (
        <Col sm="12" md={{ size: 9, offset: 3 }} xs="12" key={i}>
          <Row >
            <Col md={4} xs={4} sm={4}>
              <FormGroup>
                <input type="number" className="form-control" value={data.time}  name="time" onChange={e => handleNotification(e.target.name, e.target.value, i)}/>
              </FormGroup>
            </Col>
            <Col md={4} xs={6} sm={5}>
              <FormGroup>
                  { renderUnits(data.unit, i) }
              </FormGroup>
            </Col>
            <Col md={2} xs={2} sm={2}>
              <i className="fa fa-close fa-lg" style={{fontSize: 25, lineHeight: "31px" }} onClick={e => removeNotification(i)}></i>
            </Col>
          </Row>
        </Col>
      );
    });
    return (<Col md="12" xs ="12"> {reminderList} </Col>);
  }

  function renderUnits(data_value, i){
    let unitList = units.map((data_unit, unit_key) =>{
      return (
          <option value={ data_unit } key={ unit_key }>{ data_unit }</option>
      )
    })
    return (
      <Input className="float-right actions-select" type="select" value={data_value} name="unit" onChange={e => handleNotification(e.target.name, e.target.value,  i)}>
          { unitList }
      </Input>
    )
  }
  return (<form onSubmit={handleSubmit} noValidate>
    <ModalBody>
      <FormGroup row>
        <Col md="3">
          <Trans i18nKey="calendars.date_from"/>
        </Col>
        <Col xs="12" md="9">
          <DatetimePickerTrigger
              moment={dateFrom}
              onChange={(date) =>handleChange("eventStart", date)}
              startDay={0} weeks={['Mon', 'Die', 'Mit', 'Don', 'Fri', 'Sam', 'Son']}
              months={['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']}>
            <input type="text" value={dateFrom.format('DD.MM.YYYY HH:mm')} readOnly className="form-control" />
          </DatetimePickerTrigger>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="3">
          <Trans i18nKey="calendars.date_to"/>
        </Col>
        <Col xs="12" md="9">
          <DatetimePickerTrigger
              moment={dateTo}
              onChange={(date) =>handleChange("eventEnd", date)}
              startDay={0} weeks={['Mon', 'Die', 'Mit', 'Don', 'Fri', 'Sam', 'Son']}
              months={['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']}>
            <input type="text" value={dateTo.format('DD.MM.YYYY HH:mm')} readOnly className="form-control" />
          </DatetimePickerTrigger>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="calendar-name"><Trans i18nKey="calendars.summary"/></Label>
        </Col>
        <Col xs="12" md="9">
          <Input type="text"
                 name="summary"
                 id="event-summary"
                 className={`${errors.has('summary') && 'is-invalid'}`}
                 placeholder={t('calendars.event_summary')}
                 value={summary || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required
                 autoFocus/>
          {errors.has('summary') && <div className="invalid-feedback">{errors.first('name')}</div>}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="textarea-input"><Trans i18nKey="common.description"/></Label>
        </Col>
        <Col xs="12" md="9">
          <Input type="textarea" name="description" id="textarea-input" rows="4" value={description || ''}
                 className={`${errors.has('description') && 'is-invalid'}`}
                 placeholder={t('common.description')} onChange={e => handleChange(e.target.name, e.target.value)} required/>
          {errors.has('description') && <div className="invalid-feedback">{errors.first('description')}</div>}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="calendar-link"><Trans i18nKey="calendars.short_link"/></Label>
        </Col>
        <Col xs="12" md="9">
          <p><a href={shortLink} target="_blank">{shortLink}</a></p>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="12" xs ="12">
          <Label><Trans i18nKey="calendars.reminders"/></Label>
        </Col>
          { renderNotifications() }
        <Col md="12" xs ="12">
          <Button color="light" block onClick={() => addNotification()} className="add-notification-button" style={{width:'165px', float:'right' }}><i className="fa fa-plus fa-lg"></i> <Trans i18nKey="calendars.add_notifications"/></Button>
        </Col>
      </FormGroup>
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
    </ModalBody>
    <ModalFooter>
      <Button color="primary" type="submit">{eventId ? t('common.update') : t('common.create')}</Button>{' '}
      {eventId ? (<Button color="danger" onClick={handleDelete}><Trans i18nKey="common.delete"/></Button>) : ''}{eventId ? ' ' : ''}
      <Button color="secondary" onClick={handleCancel}><Trans i18nKey="common.cancel"/></Button>
    </ModalFooter>
  </form>);
};

CreateForm.displayName = displayName;
CreateForm.propTypes = propTypes;


export default withTranslation()(CreateForm)
