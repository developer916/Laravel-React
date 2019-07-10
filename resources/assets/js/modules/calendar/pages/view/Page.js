import React, {Component} from 'react'
import PropTypes from "prop-types"
import _ from 'lodash'

import {
  Card, CardHeader, CardBody,
  Row, Col, Input,
  ModalHeader, ModalFooter, ModalBody, Modal, Button
} from 'reactstrap'

import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import {Trans, withTranslation } from 'react-i18next';

// import calendar styles
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import {createEvent, deleteEvent, viewCalendar, updateEvent, getEventShortLink, getCalendar} from "../../service";
import {getEditor} from "../../../sub-code-generator/pages/code/components/service";
import { submitSubscriber, getPublicIp, subscribeCalendar} from "../../../public/service"

import {connect} from 'react-redux'
import ReeValidate from 'ree-validate'
import {Redirect} from 'react-router-dom'

import CreateForm from './components/CreateForm';

const localizer = BigCalendar.momentLocalizer(moment);
const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

import LHtmlRender from "../../../sub-code-generator/pages/code/components/LHtmlRender";
import i18n from "../../../../i18n";

// define const variables
const templateType = "website"

const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';

class Page extends Component {
  static displayName = "CalendarViewPage";
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    editor: PropTypes.object.isRequired,
    selectedCalendar: PropTypes.object.isRequired,
    license: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.validator = new ReeValidate({
      summary: 'required',
      description: 'required'
    });

    this.subscriberValidator = new ReeValidate({
        email: 'required|email',
    });

    this.state = {
      calendarEvents: props.calendarEvents,
      event: {
        summary: '',
        description: '',
        hashCode: '',
        shortLink: '',
      },
      subscriber: {
          name: '',
          email: '',
          description: ''
      },
      icsFileLink: '',
      webcalIcsFileLink: '',
      eventStart: '',
      eventEnd: '',
      isHelpModalOpen : false,
      helpType :'',
      publicIp: '',
      showCreateModal: false,
      showDangerModal: false,
      showSubscribeModal: false,
      subscribeModalStep: 1,
      errors: this.validator.errors,
      subscriberErrors: this.subscriberValidator.errors,
      reminders : [],
      units : ["minutes", "hours", "days", "weeks"],
      eventId: 0,
      getError : false,
      getErrorFromSubmitSubscriber: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.convertDateToMoment = this.convertDateToMoment.bind(this);
    this.convertTimezone = this.convertTimezone.bind(this);
    this.convertDateFromUTCToLocal = this.convertDateFromUTCToLocal.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    // calendar - drag and drop
    this.moveEvent = this.moveEvent.bind(this);

    // calendar - subscribe
    this.onSubscribe = this.onSubscribe.bind(this);
    this.onSubmitSubscriber = this.onSubmitSubscriber.bind(this)
    this.renderModalBodyByStep = this.renderModalBodyByStep.bind(this)

  }



  componentDidMount() {
    const {match} = this.props;
    if(!_.isEmpty(this.props.selectedCalendar)) {
      this.getCalendarData()
      this.getEditor(templateType)
    } else{
        let params = {
            calendar_id: match.params.id
        }
        this.props.dispatch(getCalendar(params))
            .then(res => {
                this.getCalendarData();
                this.getEditor(templateType)
            }).catch(err => {
            console.log(err);
        });
    }
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

  convertDateFromUTCToLocal(date){
      var localTime  = moment.utc(date).toDate();
      localTime = moment(localTime);
      return localTime.format('YYYY-MM-DD HH:mm');
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


  getCalendarData() {
    this.props.dispatch(viewCalendar(this.props.selectedCalendar))
      .then(res => {
        // let eventList = [];
        // if(res.length >0){
        //   res.map(each =>{
        //     let dateFrom = this.convertDateFromUTCToLocal(each.dateFrom);
        //     let dateTo = this.convertDateFromUTCToLocal(each.dateTo);
        //     each.dateFrom = dateFrom;
        //     each.dateTo = dateTo;
        //     eventList.push(each);
        //   });
        // }
        this.setState({calendarEvents: res});
      }).catch(err => {
      console.log(err);
    });
  }

  getEditor(type) {
    const {dispatch, selectedCalendar} = this.props

    dispatch(getEditor({
      // calendarId: selectedCalendar.id,
      // templateType: type
        hashCode: selectedCalendar.hashCode,
        templateType: templateType
    }))
  }

  handleSelect = ({start, end}) => {
    if(this.props.role != 'company'){
        return;
    }

    this.setState({eventStart: start, eventEnd: end, eventId: 0, event: {summary: '', description: '', hashCode: '', shortLink: ''}});
    this.props.dispatch(getEventShortLink())
      .then(res => {
        this.setState({
          event: {
            summary: '',
            description: '',
            hashCode: res.hashCode,
            shortLink: res.shortLink,
          },
          showCreateModal: !this.state.showCreateModal
        })
      })
  };

  handleSelectEvent(event) {
    if(this.props.role != 'company'){
      return;
    }

    this.setState({
      event: {
        summary: event.title,
        description: event.description,
        hashCode: event.hashCode,
        shortLink: event.shortLink
      },
      eventStart: new Date(event.dateFrom),
      eventEnd: new Date(event.dateTo),
      eventId: event.id,
      reminders : event.reminders,
      units : ["minutes", "hours", "days", "weeks"],
    });
    this.openCreateModal();
  }

  handleChange(name, value) {
    if(name === "eventStart"|| name ==="eventEnd"){
        this.setState({[name]: value});
    } else {
      const {errors} = this.validator;

      this.setState({event: {...this.state.event, [name]: value}});

      errors.remove(name);

      this.validator.validate(name, value)
          .then(() => {
              this.setState({errors})
          })
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    const {event} = this.state;
    const {errors} = this.validator;

    this.validator.validateAll(event)
      .then((success) => {
        if (success) {
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
          let convertedDateFromTime = this.convertTimezone(this.state.eventStart);
          let convertedDateToTime = this.convertTimezone(this.state.eventEnd);
          let eventData = {
            calendar_id: this.props.selectedCalendar.id,
            company_id: this.props.selectedCalendar.companyId,
            summary: this.state.event.summary,
            hash_code: this.state.event.hashCode,
            short_link: this.state.event.shortLink,
            description: this.state.event.description,
            // date_from: this.formatDate(new Date(this.state.eventStart)),
            // date_to: this.formatDate(new Date(this.state.eventEnd))
            date_from: convertedDateFromTime,
            date_to: convertedDateToTime
          };

          if(insertReminder.length >0){
            for(var i =0 ; i< insertReminder.length; i++){
                times.push(insertReminder[i]['time']);
                units.push(insertReminder[i]['unit']);
            }
            eventData.times =  times;
            eventData.units =  units;
          }

          if (this.state.eventId) {
            eventData.event_id = this.state.eventId
          }

          this.props.dispatch(createEvent(eventData))
            .then(res => {
               if(res.status =="success"){
                   this.openCreateModal();
                   this.setState({
                       event: {
                           summary: '',
                           description: ''
                       },
                       reminders:[]
                   })
               } else {
                   this.setState({getError:true});
               }

            })
            .catch(({error, statusCode}) => {
              const {errors} = this.validator;

              if (statusCode === 422) {
                _.forOwn(error, (message, field) => {
                  errors.add(field, message);
                });
              } else if (statusCode === 401) {
                errors.add('name', error);
              }

              this.setState({errors})
            })
        } else {
          this.setState({errors})
        }
      })
  }

  handleDelete() {
    this.openCreateModal();
    this.openDangerModal();
  }

  onChangeSubscriber(name, value) {
      let subscriber = {
          ...this.state.subscriber,
          [name]: value
      }

      this.setState({
          subscriber: subscriber
      })
    }

  onSubmitSubscriber(e) {
    e.preventDefault()

    const {subscriber} = this.state
    const {errors} = this.subscriberValidator

    this.subscriberValidator.validateAll(subscriber)
      .then((success) => {
          if (success) {
              this.submitSubscriber(subscriber)
              // this.setState({
              //     subscribeModalStep: 2
              // })
          } else {
              console.log("errors", errors );
              this.setState({ subscriberErrors : errors})
          }
      })
  }

  submitSubscriber(subscriber) {
      const {uuid} = this.props

      let params = {
          name: subscriber.name,
          email: subscriber.email,
          uuid: uuid,
          calendarId: this.props.selectedCalendar.id
      }
      this.props.dispatch(submitSubscriber(params))
      .then(res => {
          if (res.status == 'success') {
              this.setState({
                  subscribeModalStep: 2
              })
          } else {
              this.setState({getErrorFromSubmitSubscriber: true});
          }
      })
      .catch(({error, statusCode}) => {
          const {errors} = this.subscriberValidator;

          if (statusCode === 422) {
              _.forOwn(error, (message, field) => {
                  errors.add(field, message);
              });
          } else if (statusCode === 401) {
              errors.add('name', error);
          }

          this.setState({ subscriberErrors : errors })
      })
  }


  toggleHelpModal(type=null){
    if (!_.isEmpty(type)) {
        if(type == "google"){
            this.setState({helpType: "google"});
        } else if(type == "outlook"){
            this.setState({helpType: "outlook"});
        } else if(type == "apple"){
            this.setState({helpType: "apple"});
        }
    }
    this.setState({isHelpModalOpen : !this.state.isHelpModalOpen})
  }

  onSubscribe() {
      const { selectedCalendar, uuid, dispatch } = this.props;
    // this.openSubscribeModal();
      let icsFileLink = "";
      let webcalIcsFileLink = "";

      if (selectedCalendar.not === "false") {

          icsFileLink = window.location.origin + "/ics/" + selectedCalendar.hashCode + ".ics";
          webcalIcsFileLink = 'webcal://' + window.location.host + "/ics/"+ selectedCalendar.hashCode;

          this.setState({
              showSubscribeModal: true,
              subscribeModalStep: 2,
              icsFileLink: icsFileLink,
              webcalIcsFileLink : webcalIcsFileLink
          })
      } else {
          icsFileLink = window.location.origin + "/ics/" +  uuid + "/" + selectedCalendar.hashCode + ".ics";
          webcalIcsFileLink = 'webcal://' + window.location.host + "/ics/" + uuid + "/" + selectedCalendar.hashCode;
          this.setState({
              showSubscribeModal: true,
              subscribeModalStep: 1,
              icsFileLink: icsFileLink,
              webcalIcsFileLink : webcalIcsFileLink,
              subscriber: {
                  name: '',
                  email: '',
                  description: ''
              },
          })
      }
      dispatch(subscribeCalendar(uuid, selectedCalendar.id, this.state.publicIp))
  }

  //render modal body
    renderModalBodyByStep() {
      const {editor, t, selectedCalendar, uuid} = this.props;

      const {subscribeModalStep, subscriber, subscriberErrors, getErrorFromSubmitSubscriber} = this.state;
        if (subscribeModalStep === 1) {
          return (<Row>
            <Col xs={12}>
                <Row>
                    <Col md={12}>
                        {(() => {
                            if(getErrorFromSubmitSubscriber == true) {
                                return (
                                    <div className="alert alert-danger" role="alert">
                                        <Trans i18nKey="common.can_not_create_subscriber"/>
                                    </div>
                                )
                            }
                        })()}
                    </Col>
                </Row>
              <h6><Trans i18nKey="home.please_fill_out_your_information_and_click_to_submit_before_subscribe"/></h6>
              <Row className="subscribe-modal-detail">
                <Col md={5} xs={12} className="subscribe-modal-item">
                  <Input type="text" name="name" placeholder={t('home.put_your_name')} value={subscriber.name} onChange={(e) => this.onChangeSubscriber(e.target.name, e.target.value)}/>
                </Col>
                <Col md={5} xs={12} className="subscribe-modal-item">
                  <Input type="text" name="email" className={`${subscriberErrors.has('email') && 'is-invalid'}`} placeholder={t('home.put_your_email')} value={subscriber.email} onChange={(e) => this.onChangeSubscriber(e.target.name, e.target.value)}/>
                  {subscriberErrors.has('email') && <div className="invalid-feedback">{subscriberErrors.first('email')}</div>}
                </Col>
                <Col md={2} xs={12} className="subscribe-modal-last-item">
                  <Button color="primary" outline style={{width: '100%'}} onClick={e => this.onSubmitSubscriber(e)}><Trans i18nKey="home.submit"/></Button>
                </Col>
              </Row>
            </Col>
          </Row>)
        } else {
            if(! _.isEmpty(editor.data)){
                return (<Row>
                  <Col xs={12}>
                    <LHtmlRender editor={editor} calendar={selectedCalendar} uuid={uuid}/>
                  </Col>
                </Row>)
            } else{
              return(
                <Row>
                  <Col xs={12}>
                    <p style={{marginBottom: 10}}>
                      <Button color="primary" onClick={() => this.syncWithGoogleCalendar()}><i className="fa fa-google fa-lg"></i> <span><Trans i18nKey="home.sync_with_google_calendar"/></span></Button>
                      <Button outline color="secondary" onClick={() => this.toggleHelpModal("google")} style={{marginLeft: 15}}> <span><Trans i18nKey="common.help"/> </span></Button>
                    </p>
                    <p style={{marginBottom: 10}}>
                      <Button color="success" onClick={() => this.syncWithOutlookCalendar()} ><i className="fa fa-windows fa-lg"></i> <span><Trans i18nKey="home.sync_with_outlook"/></span></Button>
                      <Button  outline color="secondary" onClick={() => this.toggleHelpModal("outlook")} style={{marginLeft: 15}}> <span><Trans i18nKey="common.help"/> </span></Button>
                    </p>
                      {(() => {
                          if (navigator.appVersion.indexOf("Mac")!=-1){
                              return(
                                  <p style={{marginBottom: 10}}>
                                    <a className="btn btn-secondary"   href={this.state.webcalIcsFileLink}  ><i className="fa fa-apple fa-lg"></i> <span><Trans i18nKey="home.sync_with_icloud"/></span></a>
                                    <Button outline color="secondary" onClick={() => this.toggleHelpModal("apple")} style={{marginLeft: 15}}> <span><Trans i18nKey="common.help"/> </span></Button>
                                  </p>
                              )
                          }

                      })()}

                    <h6><Trans i18nKey="home.download"/></h6>
                    <p>
                      <Button color="secondary" onClick={() => this.downloadAsICSFile()}><i className="fa fa-download fa-lg"></i> <span><Trans i18nKey="home.download_as_ics_file"/></span></Button>
                    </p>
                    <h6><Trans i18nKey="home.ics_file_link"/></h6>
                    <p className="icsFileLinkDesc">
                        { this.state.icsFileLink }
                    </p>
                    <br/>

                  </Col>
                </Row>
              );
            }
        }
    }
  syncWithGoogleCalendar() {
    let pageLink = "https://www.google.com/calendar/render?cid=" + this.state.webcalIcsFileLink
    window.open(pageLink, "_blank") //to open new page
  }

  syncWithOutlookCalendar() {
    // let pageLink = "https://calendar.live.com/calendar/calendar.aspx?rru=addsubscription&name=" +
    //   this.props.selectedCalendar.name +
    //   "&url=" + this.state.icsFileLink;
    let pageLink = "https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&name=" + this.props.selectedCalendar.name + "&url=" + this.state.webcalIcsFileLink ;
    window.open(pageLink, "_blank") //to open new page
  }

  downloadAsICSFile() {
      let pageLink = this.state.icsFileLink;
    window.open(pageLink, "_blank");
  }

  formatDate(d) {
    return d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
      ("00" + d.getDate()).slice(-2) +
      " " +
      ("00" + d.getHours()).slice(-2) + ":" +
      ("00" + d.getMinutes()).slice(-2) + ":" +
      ("00" + d.getSeconds()).slice(-2);
  }

  handleCancel() {
    this.setState({
        getError: false,
        event: {
            summary: '',
            description: '',
        },
        reminders:[],
        showCreateModal: false
    });
  }

  openCreateModal() {
    this.setState({showCreateModal: !this.state.showCreateModal});
  }

  openDangerModal() {
    this.setState({
      showDangerModal: !this.state.showDangerModal,
    });
  }

  openSubscribeModal() {
    const { errors } = this.subscriberValidator;

    if(errors.items.length >0) {
      errors.items = [];
      this.setState({subscriberErrors: errors})
    }
    if(this.state.showSubscribeModal){
        this.setState({
            showSubscribeModal: !this.state.showSubscribeModal,
            subscribeModalStep: 1,
            icsFileLink: '',
            webcalIcsFileLink :'',
            getErrorFromSubmitSubscriber: false,
            subscriber: {
                name: '',
                email: '',
                description: ''
            }
        });
    } else {
        this.setState({
            showSubscribeModal: !this.state.showSubscribeModal,
        });
    }
  }

  createEvent() {
    if(this.props.role != 'company'){
        return;
    }
    this.openCreateModal();
  }

  deleteEvent() {
    if(this.props.role != 'company'){
        return;
    }
    if(this.state.showCreateModal == true){
        this.openCreateModal();
    }
    this.openDangerModal();
    this.props.dispatch(deleteEvent(this.state.eventId))
      .then(res => {
        this.setState({calendarEvents: this.props.calendarEvents});
      })
      .catch(({error, statusCode}) => {
        const {errors} = this.validator;

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        } else if (statusCode === 401) {
          errors.add('name', error);
        }

        this.setState({errors})
      })
  }

  // calendar - event drag and drop
  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    if(this.props.role != 'company'){
        return;
    }
    if(this.state.showCreateModal == true){
        this.openCreateModal();
    }

    const { calendarEvents } = this.state;

    const idx = calendarEvents.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }
    let convertedDateFromTime = this.convertTimezone(start);
    let convertedDateToTime = this.convertTimezone(end);
    let dateFrom = this.convertDateFromUTCToLocal(start);
    let dateTo = this.convertDateFromUTCToLocal(end);

    const updatedEvent = { ...event, start, end, dateFrom, dateTo, allDay };
    //
    // const nextEvents = [...calendarEvents];
    // nextEvents.splice(idx, 1, updatedEvent);

    let eventData = {
      id: updatedEvent.id,
      // start: this.formatDate(new Date(start)),
      // end: this.formatDate(new Date(end))
      start : convertedDateFromTime,
      end: convertedDateToTime
    };

    this.props.dispatch(updateEvent(eventData))
      .then(res => {
        this.setState({
          event: {
            summary: '',
            description: ''
          }
        })
      })
      .catch(({error, statusCode}) => {
        const {errors} = this.validator;

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        } else if (statusCode === 401) {
          errors.add('name', error);
        }

        this.setState({errors})
      })

    // this.setState({
    //   calendarEvents: nextEvents,
    // })


    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    if(this.props.role != 'company'){
        return;
    }
    if(this.state.showCreateModal == true){
        this.openCreateModal();
    }
    const { calendarEvents } = this.state

    let dateFrom = this.convertDateFromUTCToLocal(start);
    let dateTo = this.convertDateFromUTCToLocal(end);
    // const idx = calendarEvents.indexOf(event);
    // const updatedEvent = { ...event, start, end, dateFrom, dateTo };
    //
    // const nextEvents = [...calendarEvents];
    // nextEvents.splice(idx, 1, updatedEvent);
    // const nextEvents = calendarEvents.map(existingEvent => {
    //   return existingEvent.id == event.id
    //     ? { ...existingEvent, start, end }
    //     : existingEvent
    // });
    let convertedDateFromTime = this.convertTimezone(start);
    let convertedDateToTime = this.convertTimezone(end);
    let eventData = {
      id: event.id,
      // start: this.formatDate(new Date(start)),
      // end: this.formatDate(new Date(end))
      start: convertedDateFromTime,
      end:   convertedDateToTime
    };

    this.props.dispatch(updateEvent(eventData))
      .then(res => {
        console.log(res);
        this.setState({
          event: {
            summary: '',
            description: ''
          }
        })
      })
      .catch(({error, statusCode}) => {
        const {errors} = this.validator;

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        } else if (statusCode === 401) {
          errors.add('name', error);
        }

        this.setState({errors})
      })

    // this.setState({
    //   calendarEvents: nextEvents,
    // })

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  render() {
    // if(_.isEmpty(this.props.selectedCalendar)){
    //     return <Redirect to='/calendars' />
    // }
    const props = {
      summary: this.state.event.summary,
      description: this.state.event.description,
      shortLink: this.state.event.shortLink,
      errors: this.state.errors,
      dateFrom: this.convertDateToMoment((this.state.eventStart)),
      dateTo: this.convertDateToMoment((this.state.eventEnd)),
      eventId: this.state.eventId,
      reminders: this.state.reminders,
      units : this.state.units,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      handleCancel: this.handleCancel,
      handleDelete: this.handleDelete,
      addNotification: this.addNotification,
      removeNotification: this.removeNotification,
      handleNotification: this.handleNotification,
      getError: this.state.getError
    };

    const {license} = this.props
    // const subscribeButton = _.isEmpty(license) ? '' : (license.enabledFunction === 'on' ? <div className="card-actions">
    //   <button className="btn btn-light btn-block" onClick={() => this.onSubscribe()} style={{width: 90}}>Subscribe</button>
    // </div> : '')
    const subscribeButton = (!_.isEmpty(license) && license.enabledFunction === 'on')
      ? <button className="btn btn-light btn-block" onClick={() => this.onSubscribe()} style={{width: 90}}><Trans i18nKey="calendars.subscribe"/></button>
      : <button className="btn btn-light btn-block disabled" disabled style={{width: 90}}><Trans i18nKey="calendars.subscribe"/></button>

    const {editor} = this.props
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-calendar"></i><Trans i18nKey="common.calendar"/>
            <div className="card-actions">
              {subscribeButton}
            </div>
          </CardHeader>
          {(() => {
            if(this.state.showCreateModal){
              return(
                <CardBody>
                  <div className="modal-content">
                    <div className="modal-header">
                      {(() => {
                        if(this.state.eventId) {
                          return(
                              <h5 className="modal-title">
                                <Trans i18nKey="common.update"/> <Trans i18nKey="common.event"/>
                              </h5>
                          );
                        }else {
                            return(
                                <h5 className="modal-title">
                                  <Trans i18nKey="common.create"/> <Trans i18nKey="common.event"/>
                                </h5>
                            );
                        }
                      })()}
                    </div>
                    <CreateForm {...props} />
                  </div>
                </CardBody>
              );
            }
          })()}

          <CardBody style={{height: '40em'}}>
            {/*<Modal isOpen={this.state.showCreateModal} toggle={() => this.openCreateModal()}*/}
                   {/*className={'modal-primary'}>*/}
              {/*<ModalHeader toggle={() => this.openCreateModal()}>Create Event</ModalHeader>*/}
              {/*<CreateForm {...props} />*/}
            {/*</Modal>*/}
            <Modal isOpen={this.state.showDangerModal} toggle={() => this.openDangerModal()}
                   className={'modal-danger'}>
              <ModalHeader toggle={() => this.openDangerModal()}><Trans i18nKey="common.warning"/></ModalHeader>
              <ModalBody>
                <Trans i18nKey="calendars.event_delete_message"/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => this.deleteEvent()}><Trans i18nKey="common.ok"/></Button>{' '}
                <Button color="secondary" onClick={() => this.openDangerModal()}><Trans i18nKey="common.cancel"/></Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.showSubscribeModal} toggle={() => this.openSubscribeModal()}
                   className={'modal-lg'}>
              <ModalHeader toggle={() => this.openSubscribeModal()}><Trans i18nKey="home.subscribe_calendar"/></ModalHeader>
              <ModalBody>
                  {this.renderModalBodyByStep()}
                {/*<LHtmlRender editor={editor} calendar={this.props.selectedCalendar}/>*/}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.openSubscribeModal()}><Trans i18nKey="common.cancel"/></Button>
              </ModalFooter>
            </Modal>
              <Modal isOpen={this.state.isHelpModalOpen} toggle={() => this.toggleHelpModal()} className="modal-lg subscribe-help-modal">
                  <ModalHeader toggle={() => this.toggleHelpModal()}>
                      <div className='col-md-12' style={{display:  this.state.helpType=="google" ? 'block' : 'none' }}>
                          <p style={{marginBottom:0}}><Trans i18nKey="common.guide_to_subscribe_with_google_calendar"/></p>
                      </div>
                      <p id="outlookTitle" style={{display: this.state.helpType=="outlook" ? 'block' : 'none'}}><Trans i18nKey="home.sync_with_outlook"/></p>
                      <p id="appleTitle" style={{display:   this.state.helpType=="apple" ? 'block' : 'none'}}><Trans i18nKey="home.sync_with_icloud"/></p>
                  </ModalHeader>

                  <ModalBody>
                      <div className='col-md-12' style={{display:  this.state.helpType=="google" ? 'block' : 'none' }}>
                          <p className="step-content"><Trans i18nKey="common.guide_to_subscribe_with_google_calendar_description"/></p>

                          <div className="box">
                              <div className="box__left">
                                  <p>1.</p>
                                  <p><Trans i18nKey="common.guide_to_subscribe_with_google_calendar_description_step1"/> <a href="https://accounts.google.com/signin" target="_blank">https://accounts.google.com/signin</a> <Trans i18nKey="common.guide_to_subscribe_with_google_calendar_description_step11"/></p>
                              </div>
                              <div className="box__right">
                                  <img src={getCurrentLng()== "gm" ? "img/subscribe/login_de.png" : "img/subscribe/login_en.png" } alt="login-en" className="center" />
                              </div>
                          </div>

                          <div className="box">
                              <div className="box__left">
                                  <p>2.</p>
                                  <p><Trans i18nKey="common.guide_to_subscribe_with_google_calendar_description_step2"/></p>
                              </div>
                              <div className="box__right">
                                  <img src={getCurrentLng()== "gm" ? "img/subscribe/share_with_google_de.png" : "img/subscribe/share_with_google_en.png" } alt="login-en" className="center" />
                              </div>
                          </div>

                          <div className="box">
                              <div className="box__left">
                                  <p>3.</p>
                                  <p><Trans i18nKey="common.guide_to_subscribe_with_google_calendar_description_step3"/></p>
                              </div>
                              <div className="box__right">
                                  <img src= {getCurrentLng()== "gm" ? "img/subscribe/add_to_google_de.png" : "img/subscribe/add_to_google_en.png" } alt="login-en" className="center" />
                              </div>
                          </div>

                          <div className="box">
                              <div className="box__left">
                                  <p>4.</p>
                                  <p><Trans i18nKey="common.guide_to_subscribe_with_google_calendar_description_step4"/></p>
                                  <p><i className="fa fa-check"></i></p>
                              </div>
                          </div>

                      </div>

                      <p id="outlookBody" style={{display: this.state.helpType=="outlook" ? 'block' : 'none'}}><Trans i18nKey="home.sync_with_outlook"/></p>
                      <p id="appleBody" style={{display:   this.state.helpType=="apple" ? 'block' : 'none'}}><Trans i18nKey="home.sync_with_icloud"/></p>
                  </ModalBody>

                  <ModalFooter>
                      <Button color="secondary" onClick={() => this.toggleHelpModal()}><Trans i18nKey="home.cancel"/></Button>
                  </ModalFooter>

              </Modal>
            <DragAndDropCalendar  className="d-sm-down-none"
                                  {...this.props}
                                  views={['month', 'week', 'day']}
                                  selectable
                                  localizer={localizer}
                                  events={this.state.calendarEvents}
                                  onEventDrop={this.moveEvent}
                                  resizable
                                  onEventResize={this.resizeEvent}
                                  onSelectSlot={this.handleSelect}
                                  step={30}
                                  defaultDate={new Date(currYear, currMonth, 1)}
                                  defaultView='month'
                                  toolbar={true}
                                  onSelectEvent={event => this.handleSelectEvent(event)}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}



export default connect()(withTranslation()(Page));
