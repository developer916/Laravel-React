// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import { Redirect } from 'react-router-dom'
import moment from 'moment';
// import components
import Form from './components/Form'

import { addEvent } from '../../service'
import { list } from '../../../calendar/service'

class Page extends Component {
  static displayName = 'AddEvent'
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

    const event = this.props.event.toJson()

    this.state = {
      event,
      focusedInput: null,
      errors: this.validator.errors,
      reminders : [],
      units : ["minutes", "hours", "days", "weeks"],
      getError: false,
      toEvent: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addNotification = this.addNotification.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
    this.handleNotification = this.handleNotification.bind(this)
    this.onDateRangeChange = this.onDateRangeChange.bind(this)
    this.convertDateToMoment = this.convertDateToMoment.bind(this)
    this.convertTimezone = this.convertTimezone.bind(this)
  }

 convertDateToMoment(date){
    var dateTime = new Date(date);
    dateTime = moment(dateTime);
    return dateTime;
 }


 convertTimezone(moment_date){
   let moment_utc_date_time = moment.utc(moment_date).format('YYYY-MM-DD HH:mm');
   return moment_utc_date_time;
 }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(list())

  }

  componentWillReceiveProps(nextProps) {
    const event = nextProps.event.toJson()
    let currentDate = this.convertDateToMoment(new Date());
    event.dateFrom = currentDate;
    event.dateTo = currentDate;
    if (!_.isEqual(this.state.event, event)) {
      this.setState({ event })
    }
  }

  // add , remove , notification

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
      delete this.state.reminders[i];
      this.setState({reminders: this.state.reminders})
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
      .then(res => {
          if (res.status == 'success') {
              this.setState({toEvent: true});
          } else {
              this.setState({getError: true});
          }
      })
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
    const { toEvent } = this.state;

    if (toEvent) {
      return (<Redirect to="/events"/>);
    }

    return <div className="add-event animated fadeIn">
      <Form {...this.state}
            calendars={ calendars }
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
