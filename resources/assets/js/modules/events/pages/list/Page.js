import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import {
  Row, Col,
  InputGroup, Input, Button,
  Card, CardBody, CardTitle, CardFooter,
  TabContent, TabPane,
  Nav, NavItem, NavLink,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import classnames from 'classnames';
import _ from 'lodash'
import { getEventsData } from '../../service'
import {getEditor} from "../../../sub-code-generator/pages/code/components/service";
let hasOwnProperty = Object.prototype.hasOwnProperty;
import ReeValidate from 'ree-validate'
import LHtmlRender from "../../../sub-code-generator/pages/code/components/LHtmlRender"
import {subscribeCalendar, submitSubscriber, getPublicIp} from "../../../public/service"
import {Trans, withTranslation } from "react-i18next";
import i18n from "../../../../i18n";

function isEmpty(obj) {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';

class Page extends Component {
  static displayName = "SuperDashboard"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    upcomingEvents: PropTypes.array.isRequired,
    pastEvents: PropTypes.array.isRequired,
    search: PropTypes.string,
    companyId: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
    this.subscriberValidator = new ReeValidate({
        email: 'required|email',
    });
    this.state = {
      activeTab: 'upcoming',
      isSubscribeModalOpen: false,
      isHelpModalOpen : false,
      helpType :'',
      icsFileLink: '',
      publicIp: '',
      webcalIcsFileLink: '',
      selectedCalendar: {},
      search: this.props.search,
      redirectPath: '',
      subscribeModalStep: 1,
      subscriber: {
          name: '',
          email: '',
          description: ''
      },
      subscriberErrors : this.subscriberValidator.errors,
      getErrorFromSubmitSubscriber : false
    }

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.redirectToPath = this.redirectToPath.bind(this);
    this.convertDateFromUTCToLocal = this.convertDateFromUTCToLocal.bind(this)
    this.onSubmitSubscriber = this.onSubmitSubscriber.bind(this)
    this.onChangeSubscriber = this.onChangeSubscriber.bind(this)
  }

  loadEvents(params) {
    const { dispatch } = this.props

    dispatch(getEventsData(params))
  }

  componentWillMount() {
    const { search } = this.props

    let params = {
      search: search
    }
    this.loadEvents(params)

    // this.props.dispatch(getPublicIp())
    //     .then(res => {
    //         this.setState({ publicIp: res.ip });
    //         console.log("list_res", res.ip);
    //     }).catch(err => {
    //     console.log(err);
    // });
  }

  convertDateFromUTCToLocal(date){
    var localTime  = moment.utc(date).toDate();
    localTime = moment(localTime);
    return localTime.format('DD.MM.YYYY HH:mm');
  }


  renderEvents(events) {
    let eventsList = events.map(each => {
    return (
      <Col md="4" xs="12" key={each.id}>
        <Card>
          <CardBody
            style={{ backgroundImage: `url(uploads/${each.calendar.picture})`, height: '130px', backgroundSize: 'cover' }}>
            <CardTitle>{ each.summary }</CardTitle>
            <p>Termin von { this.convertDateFromUTCToLocal(each.dateFrom) } bis { this.convertDateFromUTCToLocal(each.dateTo) }</p>
            <p>Erstellt am: { this.convertDateFromUTCToLocal(each.time) }<span className="float-right"><b>{ each.calendar.name }</b></span></p>
          </CardBody>
          <CardFooter>
            <div className="descriptions">
              <Row>
                <Col style={{ paddingRight: '0' }}>
                  <div className="desc text-center" style={{ borderRight: '1px solid #e1e6ef' }}>
                    <p><Trans i18nKey="events.total_subscribers"/></p>
                    <h5>{ each.totalSubscriber }</h5>
                  </div>
                </Col>
                <Col style={{ paddingLeft: '0' }}>
                  <div className="desc text-center">
                    <p><Trans i18nKey="events.new_subs_last_week"/></p>
                    <h5>{ each.weekSubscriber }</h5>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="actions">
              {(() => {
                if(this.props.role == 'company') {
                  return (
                    <Row>
                     <Col style={{paddingRight: '0'}}>
                      <div className="but edit text-center"
                           onClick={() => this.redirectToPath('/events/' + each.id + '/edit')}>
                        <h5>Edit</h5>
                      </div>
                    </Col>
                     <Col style={{ paddingLeft: '0' }}>
                        <div className="but share text-center" onClick={() => this.toggleSubscribeModal(each)}>
                          <h5>Share</h5>
                        </div>
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Row>
                      <Col>
                        <div className="but share text-center" onClick={() => this.toggleSubscribeModal(each)}>
                          <h5>Share</h5>
                        </div>
                      </Col>
                    </Row>
                  );
                }
              })()}
            </div>
          </CardFooter>
        </Card>
      </Col>
    )});
    return events.length > 0 ? (<Row className="body">
      { eventsList }
    </Row>) : (<Row className="body">
      <Col style={{ textAlign: 'center', paddingBottom: '15px' }}>No Events Data</Col>
    </Row>);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleChange(name, value) {
    let params = {
      search: value
    }
    this.loadEvents(params)
    this.setState({
      [name]: value
    })
  }

  onSearch() {
    let params = {
      search: this.state.search
    }
    this.loadEvents(params)
  }

  redirectToPath(path) {
    this.setState({
      redirectPath: path
    });
  }

// subscriber functions
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
              this.setState({ subscriberErrors: errors })
          }
      })
  }
  submitSubscriber(subscriber) {
    const {uuid} = this.props

    let params = {
        name: subscriber.name,
        email: subscriber.email,
        uuid: uuid,
        calendarId: this.state.selectedCalendar.id
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

  //render modal body
  renderModalBodyByStep() {
    const {editor, t, uuid} = this.props
    const {subscribeModalStep, subscriber, selectedCalendar, subscriberErrors, getErrorFromSubmitSubscriber} = this.state

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
              <Input type="text" name="email"  className={`${subscriberErrors.has('email') && 'is-invalid'}`} placeholder={t('home.put_your_email')} value={subscriber.email} onChange={(e) => this.onChangeSubscriber(e.target.name, e.target.value)}/>
              {subscriberErrors.has('email') && <div className="invalid-feedback">{subscriberErrors.first('email')}</div>}
            </Col>
            <Col md={2} xs={12} className="subscribe-modal-last-item">
              <Button color="primary" outline style={{width: '100%'}} onClick={e => this.onSubmitSubscriber(e)}><Trans i18nKey="common.submit"/></Button>
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
    let pageLink = "https://www.google.com/calendar/render?cid=" + this.state.webcalIcsFileLink;
    window.open(pageLink, "_blank") //to open new page
  }

  syncWithOutlookCalendar() {
    // let pageLink = "https://calendar.live.com/calendar/calendar.aspx?rru=addsubscription&name=" +
    //   this.state.selectedCalendar.name +
    //   "&url=" +
    //   + this.state.icsFileLink;

   let pageLink = "https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&name=" + this.state.selectedCalendar.name + "&url=" + this.state.webcalIcsFileLink ;
    window.open(pageLink, "_blank") //to open new page
  }

  downloadAsICSFile() {
    window.open(this.state.icsFileLink, "_blank");
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

  toggleSubscribeModal(data=null) {
    if (isEmpty(data)) {
      this.setState({
        isSubscribeModalOpen: !this.state.isSubscribeModalOpen,
        icsFileLink: '',
        webcalIcsFileLink :'',
        getErrorFromSubmitSubscriber: false,
        subscriber: {
            name: '',
            email: '',
            description: ''
        }
      })
    } else {
      const { uuid, dispatch } = this.props
      const { errors } = this.subscriberValidator;
      let templateType = 'website';

      let icsFileLink = "";

      let webcalIcsFileLink = "";

      if(errors.items.length >0) {
          errors.items = [];
          this.setState({subscriberErrors: errors})
      }

      if (data.calendar.not === "false") {

          icsFileLink = window.location.origin + "/ics/" + data.calendar.hashCode + ".ics";

          webcalIcsFileLink = 'webcal://' + window.location.host + "/ics/"+ data.calendar.hashCode;

          this.setState({
              // isSubscribeModalOpen: true,
              subscribeModalStep: 2,
              selectedCalendar: data.calendar,
              icsFileLink: icsFileLink,
              webcalIcsFileLink: webcalIcsFileLink
          })
      } else {
          icsFileLink = window.location.origin + "/ics/" +  uuid + "/" + data.calendar.hashCode + ".ics";

          webcalIcsFileLink = 'webcal://' + window.location.host + "/ics/" +  uuid + "/" + data.calendar.hashCode;

          this.setState({
              // isSubscribeModalOpen: true,
              subscribeModalStep: 1,
              selectedCalendar: data.calendar,
              icsFileLink: icsFileLink,
              webcalIcsFileLink: webcalIcsFileLink,
              subscriber: {
                  name: '',
                  email: '',
                  description: ''
              },
          })
      }
      dispatch(getEditor({
          hashCode: data.calendar.hashCode,
          templateType: templateType
      }))
      .then(res => {
          if(res.result == "success"){
              this.setState({
                  isSubscribeModalOpen: true
              });
              dispatch(subscribeCalendar(uuid, data.calendar.id, this.state.publicIp))
          }
      })
      .catch(({ error, statusCode }) => {

      })


      // dispatch(subscribeCalendar(uuid, data.calendar.id))
    }
  }


  render() {
    let { upcomingEvents, pastEvents } = this.props;

    let createEventPath = '/events/add'
    if (this.state.redirectPath !== '') {
      return (<Redirect to={ this.state.redirectPath }/>);
    }
    const {t} = this.props;

    return (<div className="events animated fadeIn">
      <Modal isOpen={this.state.isSubscribeModalOpen} toggle={() => this.toggleSubscribeModal()}
             className={'modal-lg'}>
        <ModalHeader toggle={() => this.toggleSubscribeModal()}><Trans i18nKey="home.subscribe_calendar"/></ModalHeader>
        <ModalBody>
           {this.renderModalBodyByStep()}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => this.toggleSubscribeModal()}><Trans i18nKey="common.cancel"/></Button>
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
      <Row>
        <Col xs="12" md="12" className="mb-4">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'upcoming' })}
                onClick={() => { this.toggle('upcoming'); }}
              >
                <Trans i18nKey="events.upcoming_events"/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'past' })}
                onClick={() => { this.toggle('past'); }}
              >
                <Trans i18nKey="events.past_events"/>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <div className="search">
              <Row>
                <Col md={8} xs={12}>
                  <InputGroup>
                    <Input type="text" id="search" name="search" placeholder={t('home.search')} onChange={e => this.handleChange(e.target.name, e.target.value)} value={this.state.search}/>
                    <div className="input-group-append">
                      <Button type="button" color="secondary" onClick={() => this.onSearch()}><i className="fa fa-search"></i> <Trans i18nKey="home.search"/></Button>
                    </div>
                  </InputGroup>
                </Col>
                {(() => {
                 if(this.props.role == 'company'){
                   return (
                       <Col md={4} xs={12} style={{ textAlign: 'right' }}>
                         <Button outline color="primary" onClick={() => this.redirectToPath(createEventPath)}><Trans i18nKey="events.create_event"/></Button>
                       </Col>
                   );
                 }
                })()}
              </Row>
            </div>
            <TabPane tabId="upcoming">
              { this.renderEvents(upcomingEvents) }
            </TabPane>
            <TabPane tabId="past">
              { this.renderEvents(pastEvents) }
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>)
  }
}

export default withTranslation()(Page)
