import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Row, Col,
  Card, CardBody,
  FormGroup, Button, Input, InputGroup, Label
} from 'reactstrap';

// React DateRangePicker
import 'react-dates/initialize';
// import { DateRangePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

import {DatetimePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css'
import { Trans, withTranslation} from "react-i18next";

const displayName = 'EditEventForm';
const propTypes = {
  event: PropTypes.object.isRequired,
  calendars: PropTypes.array.isRequired,
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
};

const Form = ({ event, calendars, focusedInput, errors, onSubmit, onChange, onDateRangeChange, reminders, units, addNotification, removeNotification, handleNotification, t }) => {
  function handleChange(name, value) {
    if (value !== event[name]) {
      onChange(name, value)
    }
  }

  function renderCalendars() {
    let calendarsList = calendars.map(each => {
      return (
        <option value={ each.id } key={ each.id }>{ each.name }</option>
      )
    })

    return (
      <Input className="float-right actions-select" type="select" name="calendarId" defaultValue={event.calendarId} onChange={(e)=> handleChange(e.target.name, e.target.value)}>
        <option value="">-- Select Calendar --</option>
        { calendarsList }
      </Input>
    )
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
  function renderNotifications(){
    let reminderList = reminders.map((data, i) =>{
      return (
        <Row key={i}>
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
      );
    });
    return (<Col md="12" xs ="12"> {reminderList} </Col>);
  }

  // disable calendars-select in edit
  /*
  <div className="mb-3 clearfix">
    <Label>Select the Calendar:&nbsp;&nbsp;</Label>
    { renderCalendars() }
  </div>
  */

  return (<form className="event-form" onSubmit={e => onSubmit(e)}>
    <Card>
      <CardBody className="p-4">
        <h1><Trans i18nKey="events.edit_event"/></h1>
        <FormGroup>
          <Label><Trans i18nKey="events.write_the_summary_of_event"/>: </Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="summary"
                   className={`${errors.has('name') && 'is-invalid'}`}
                   placeholder={t('events.summary')}
                   value={event.summary || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('summary') && <div className="invalid-feedback">{errors.first('summary')}</div>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label><Trans i18nKey="events.put_the_description_of_event"/>: </Label>
          <InputGroup className="mb-3">
            <Input type="text"
                   name="description"
                   className={`${errors.has('street') && 'is-invalid'}`}
                   placeholder={t('events.description')}
                   value={event.description || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            {errors.has('description') && <div className="invalid-feedback">{errors.first('description')}</div>}
          </InputGroup>
        </FormGroup>
        {(() => {
          if(event.dateFrom != null){
            return (
              <FormGroup>
                <Label><Trans i18nKey="events.start_date"/></Label>
                <Col md="3" style={{paddingLeft: 0}}>
                  <DatetimePickerTrigger
                      moment={event.dateFrom}
                      onChange={(date) =>handleChange("dateFrom", date)}
                      startDay={0} weeks={['Mon', 'Die', 'Mit', 'Don', 'Fri', 'Sam', 'Son']}
                      months={['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']}>
                    <input type="text" value={event.dateFrom.format('DD.MM.YYYY HH:mm')} readOnly className="form-control" />
                  </DatetimePickerTrigger>
                </Col>
              </FormGroup>
            );
          }
        })()}
        {(() => {
          if(event.dateTo != null){
            return (
              <FormGroup>
                <Label><Trans i18nKey="events.end_date"/></Label>
                <Col md="3" style={{paddingLeft: 0}}>
                  <DatetimePickerTrigger
                      moment={event.dateTo}
                      onChange={(date) =>handleChange("dateTo", date)}
                      startDay={0} weeks={['Mon', 'Die', 'Mit', 'Don', 'Fri', 'Sam', 'Son']}
                      months={['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']}>
                    <input type="text" value={event.dateTo.format('DD.MM.YYYY HH:mm')} readOnly className="form-control" />
                  </DatetimePickerTrigger>
                </Col>
              </FormGroup>
            );
          }
        })()}
        <FormGroup row>
          <Col md="12" xs ="12">
            <Label><Trans i18nKey="calendars.reminders"/></Label>
          </Col>
            { renderNotifications() }
          <Col md="12" xs ="12">
            <Button color="light" block onClick={() => addNotification()} className="add-notification-button"><i className="fa fa-plus fa-lg"></i> <Trans i18nKey="calendars.add_notifications"/></Button>
          </Col>
        </FormGroup>
        <Button type="submit" color="primary" block style={{ width: 150, float: "right" }}><Trans i18nKey="common.update"/></Button>
      </CardBody>
    </Card>
  </form>)
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default withTranslation()(Form)
