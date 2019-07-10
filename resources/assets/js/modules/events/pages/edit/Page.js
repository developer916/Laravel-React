// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import { Redirect } from 'react-router-dom'
import moment from 'moment';
// import components
import Form from './components/Form'

import { addEvent, getEvent } from '../../service'
import { list } from '../../../calendar/service'



class Page extends Component {
  static displayName = 'EditEvent'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    calendars: PropTypes.array.isRequired,
    isSuccess: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      calendarId: 'required',
      summary: 'required',
      description: 'required',
      dateFrom: 'required',
      dateTo: 'required',
    })

    const event = this.props.event

    this.state = {
      event,
      focusedInput: null,
      errors: this.validator.errors,
      reminders : [],
      units : ["minutes", "hours", "days", "weeks"],
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addNotification = this.addNotification.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
    this.handleNotification = this.handleNotification.bind(this)
    this.onDateRangeChange = this.onDateRangeChange.bind(this)
    this.convertDateFromUTCToLocal = this.convertDateFromUTCToLocal.bind(this)
    this.convertTimezone = this.convertTimezone.bind(this)
  }

  componentDidMount() {
    const { dispatch, event } = this.props

    // loads calendars
    dispatch(list())

    // get event
    let params = {
      id: event.id
    }
    dispatch(getEvent(params))
  }

  convertDateFromUTCToLocal(date){
    var localTime  = moment.utc(date).toDate();
    localTime = moment(localTime);
    return localTime;
  }


  convertTimezone(moment_date){
      let moment_utc_date_time = moment.utc(moment_date).format('YYYY-MM-DD HH:mm');
      return moment_utc_date_time;
  }

  componentWillReceiveProps(nextProps) {
    const event = nextProps.event
    if (!_.isEqual(this.state.event, event)) {
      let dateFrom = this.convertDateFromUTCToLocal(event.dateFrom);
      let dateTo = this.convertDateFromUTCToLocal(event.dateTo);
      event.dateFrom = dateFrom;
      event.dateTo = dateTo;
      this.setState({ event })
        let remindersList = nextProps.eventReminders;
        let stateReminders = [];
        if(remindersList.length >0){
          for(var i =0; i<remindersList.length; i++){
              let remainderItem = [];
              remainderItem['time'] = remindersList[i]['time'].toString();
              remainderItem['unit'] = remindersList[i]['unit'];
              stateReminders.push(remainderItem);
          }
          this.setState({reminders: stateReminders});
        }

    }
  }

  addNotification(){
    let reminderItem = [];
    reminderItem['time'] = "10";
    reminderItem['unit'] = 'minutes';
    let reminderArray = [] ;
    reminderArray = this.state.reminders;
    reminderArray.push(reminderItem);
    this.setState({reminders: reminderArray});
  }

  removeNotification(i){
    let remindersList = this.state.reminders;
    remindersList.splice(i,1);
    // delete this.state.reminders[i];
    // this.setState({reminders: this.state.reminders})
     this.setState({reminders: remindersList})
  }

  handleNotification(name, value, i){
    let remindersList = this.state.reminders;
    if(name =="time"){
        if ((/^\d+$/.test(value)) || value == '') {
            remindersList[i][name] = value;
        }
    } else {
        remindersList[i][name] = value;
    }
    this.setState({reminders: remindersList})
  }

  onDateRangeChange(startDate, endDate) {
    this.setState({ event: { ...this.state.event, dateFrom: startDate, dateTo: endDate } });
  }

  onChange(name, value) {
    if (name === "focusedInput") {
      this.setState({
        focusedInput: value
      })
    } else {
      const { errors } = this.validator

      this.setState({ event: { ...this.state.event, [name]: value} })

      errors.remove(name)

      this.validator.validate(name, value)
        .then(() => {
          this.setState({ errors })
        })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const event = this.state.event
    const { errors } = this.validator

    this.validator.validateAll(event)
      .then((success) => {
        if (success) {
          this.submit(event)
        } else {
          this.setState({ errors })
        }
      })
  }

  submit(event) {
    let reminderList = this.state.reminders;
    let insertReminder = [];
    if(reminderList.length >0){
      for(var i =0; i< reminderList.length; i++){
        if(reminderList[i]['time'] != 0 && reminderList[i]['time'] !=''){
          if(insertReminder.length >0){
            var exit = 0;
            for(var j =0; j< insertReminder.length; j++){
              if( (reminderList[i]['time'] == insertReminder[j]['time'] ) && (reminderList[i]['unit'] == insertReminder[j]['unit'])){
                  exit ++;
              }
            }
            if(exit == 0){
              insertReminder.push(reminderList[i]);
            }
          } else {
            insertReminder.push(reminderList[i]);
          }
        }
      }
    }

    let times = [];
    let units = [];
    let convertedDateFromTime = this.convertTimezone(event.dateFrom);
    let convertedDateToTime = this.convertTimezone(event.dateTo);
    let params = {
      event_id: event.id,
      companyId: event.companyId,
      calendarId: event.calendarId,
      dateFrom: convertedDateFromTime,
      dateTo: convertedDateToTime,
      summary: event.summary,
      description: event.description,
    }
    if(insertReminder.length >0){
      for(var i =0 ; i< insertReminder.length; i++){
        times.push(insertReminder[i]['time']);
        units.push(insertReminder[i]['unit']);
      }
      params.times =  times;
      params.units =  units;
    }
    this.props.dispatch(addEvent(params))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }

        this.setState({ errors })
      })
  }

  render() {
    const { calendars, isSuccess } = this.props
    if (isSuccess) {
      return (<Redirect to="/events"/>);
    }

    return <div className="add-event animated fadeIn">
      <Form {...this.state}
            calendars={calendars}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            addNotification={this.addNotification}
            removeNotification={this.removeNotification}
            handleNotification={this.handleNotification}
            onDateRangeChange={this.onDateRangeChange}/>
    </div>
  }
}

export default Page
