import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReeValidate from 'ree-validate'
import moment from 'moment'

import {
    Container,
    Row, Col,
    ModalHeader, ModalFooter, ModalBody, Modal,
    Input,
    Button
} from 'reactstrap'

import Navigation from '../../../../common/navigation'
import LHtmlRender from '../../../sub-code-generator/pages/code/components/LHtmlRender'

import { getCalendarDetail, subscribeCalendar, submitSubscriber, getPublicIp } from '../../service'
import { getEditor } from '../../../sub-code-generator/pages/code/components/service'
import _ from 'lodash'
import { Trans, withTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import i18n from "../../../../i18n";

// define const variables
const templateType = 'website'
const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';

class Page extends Component {
    static displayName = 'PublicCalendarSubscribePage'

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        editor: PropTypes.object.isRequired,
        calendar: PropTypes.object.isRequired,
        company: PropTypes.object.isRequired,
        events: PropTypes.array.isRequired,
        uuid: PropTypes.string.isRequired,
        hashCode: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props)

        this.subscriberValidator = new ReeValidate({
            email: 'required|email',
        })

        this.state = {
            isHelpModalOpen: false,
            helpType :'',
            publicIp: '',
            toHome: false,
            selectedEvent: {},
            subscribeModalStep: 1,
            webcalIcsFileLink: '',
            icsFileLink: '',
            subscriber: {
                name: '',
                email: '',
                description: ''
            },
            subscriberErrors: this.subscriberValidator.errors,
            getErrorFromSubmitSubscriber: false,
        }

        this.renderDetailOfCalendar = this.renderDetailOfCalendar.bind(this);
        this.goBackToHome = this.goBackToHome.bind(this)
        this.renderModalBodyByStep = this.renderModalBodyByStep.bind(this)
        this.onChangeSubscriber = this.onChangeSubscriber.bind(this)
        this.onSubmitSubscriber = this.onSubmitSubscriber.bind(this)
    }

    componentWillMount () {
        const {hashCode} = this.props
        this.props.dispatch(getCalendarDetail(hashCode))
            .then(res => {
                if (res.status == 'success') {
                    this.props.dispatch(getEditor({
                        hashCode: hashCode,
                        templateType: templateType
                    }))
                    this.renderDetailOfCalendar();
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

    onChangeSubscriber (name, value) {
        let subscriber = {
            ...this.state.subscriber,
            [name]: value
        }

        this.setState({
            subscriber: subscriber
        })
    }

    onSubmitSubscriber (e) {
        e.preventDefault()

        const { subscriber } = this.state
        const { errors } = this.subscriberValidator

        this.subscriberValidator.validateAll(subscriber)
            .then((success) => {
                if (success) {
                    this.submitSubscriber(subscriber)
                    // this.setState({
                    //   subscribeModalStep: 2
                    // })
                } else {
                    this.setState({ subscriberErrors : errors })
                }
            })
    }

    submitSubscriber (subscriber) {
        const { uuid,  calendar } = this.props

        let params = {
            name: subscriber.name,
            email: subscriber.email,
            uuid: uuid,
            calendarId: calendar.id
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

    renderModalBodyByStep () {
        const { editor, calendar, uuid } = this.props
        const { subscribeModalStep, subscriber , subscriberErrors, getErrorFromSubmitSubscriber} = this.state

        if (subscribeModalStep === 1) {
            return (
                <Row>
                    <Col xs={12}>
                        <Row>
                            <Col xs={12}>
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
                        <Row>
                            <Col xs={12}>
                                <h6><Trans i18nKey="home.please_fill_out_your_information_and_click_to_submit_before_subscribe"/></h6>
                                <Row className="subscribe-modal-detail">
                                    <Col md={5} xs={12} className="subscribe-modal-item">
                                        <Input type="text" name="name" placeholder="Put your name" value={subscriber.name}
                                               onChange={(e) => this.onChangeSubscriber(e.target.name, e.target.value)}/>
                                    </Col>
                                    <Col md={5} xs={12} className="subscribe-modal-item">
                                        <Input type="text" name="email" className={`${subscriberErrors.has('email') && 'is-invalid'}`}  placeholder="Put your email" value={subscriber.email}
                                               onChange={(e) => this.onChangeSubscriber(e.target.name, e.target.value)}/>

                                        {subscriberErrors.has('email') && <div className="invalid-feedback">{subscriberErrors.first('email')}</div>}
                                    </Col>
                                    <Col md={2} xs={12} className="subscribe-modal-last-item">
                                        <Button color="primary" outline style={{ width: '100%' }} onClick={e => this.onSubmitSubscriber(e)}><Trans
                                            i18nKey="home.submit"/></Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )
        } else {
            if (!_.isEmpty(editor.data)) {
                return (<Row>
                    <Col xs={12}>
                        <LHtmlRender editor={editor} calendar={calendar} uuid={uuid}/>
                    </Col>
                </Row>)
            } else {
                return (
                    <Row>
                        <Col xs={12}>
                            <p style={{ marginBottom: 10 }}>
                                <Button color="primary" onClick={() => this.syncWithGoogleCalendar()}><i className="fa fa-google fa-lg"></i> <span><Trans i18nKey="home.sync_with_google_calendar"/></span></Button>
                                <Button outline color="secondary" onClick={() => this.toggleHelpModal("google")} style={{marginLeft: 15}}> <span><Trans i18nKey="common.help"/> </span></Button>
                            </p>
                            <p style={{ marginBottom: 10 }}>
                                <Button color="success" onClick={() => this.syncWithOutlookCalendar()}><i className="fa fa-windows fa-lg"></i> <span><Trans i18nKey="home.sync_with_outlook"/></span></Button>
                                <Button  outline color="secondary" onClick={() => this.toggleHelpModal("outlook")} style={{marginLeft: 15}}> <span><Trans i18nKey="common.help"/> </span></Button>
                            </p>
                            {(() => {
                                if (navigator.appVersion.indexOf('Mac') != -1) {
                                    return (
                                        <p style={{ marginBottom: 10 }}>
                                            <a className="btn btn-secondary" href={this.state.webcalIcsFileLink}><i className="fa fa-apple fa-lg"></i> <span><Trans i18nKey="home.sync_with_icloud"/></span></a>
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
                                {this.state.icsFileLink}
                            </p>
                            <br/>
                        </Col>
                    </Row>
                )
            }

        }
    }

    goBackToHome () {
        this.setState({ toHome: true })
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

    renderDetailOfCalendar(){
        // alert subscribe to server
        const { uuid, calendar, dispatch } = this.props
        const { subscriberErrors } = this.state;
        let icsFileLink = "";

        let webcalIcsFileLink ="" ;

        const { errors } = this.subscriberValidator;

        if(errors.items.length >0) {
            errors.items = [];
            this.setState({subscriberErrors: errors})
        }
        if (calendar.not === 'false') {

            icsFileLink = window.location.origin + '/ics/' + calendar.hashCode + '.ics';

            webcalIcsFileLink = 'webcal://' + window.location.host + '/ics/' + calendar.hashCode ;

            this.setState({
                isSubscribeModalOpen: !this.state.isSubscribeModalOpen,
                subscribeModalStep: 2,
                icsFileLink: icsFileLink,
                webcalIcsFileLink: webcalIcsFileLink

            })
        } else {
            icsFileLink = window.location.origin + '/ics/' + uuid + "/" + calendar.hashCode + '.ics';

            webcalIcsFileLink = 'webcal://' + window.location.host + '/ics/' + uuid + "/" + calendar.hashCode ;
            this.setState({
                isSubscribeModalOpen: !this.state.isSubscribeModalOpen,
                subscribeModalStep: 1,
                icsFileLink: icsFileLink,
                webcalIcsFileLink: webcalIcsFileLink

            })
        }

        dispatch(subscribeCalendar(uuid, calendar.id, this.state.publicIp))
    }

    syncWithGoogleCalendar () {
        // let pageLink = 'https://www.google.com/calendar/render?cid=' + window.location.origin + '/ics/' + this.props.calendar.hashCode + '.ics';
        let pageLink = 'https://www.google.com/calendar/render?cid=' + this.state.webcalIcsFileLink;

        window.open(pageLink, '_blank') //to open new page
    }

    syncWithOutlookCalendar () {
        // let pageLink = 'https://calendar.live.com/calendar/calendar.aspx?rru=addsubscription&name=' +
        //   this.props.calendar.name +
        //   '&url=' +
        //   window.location.origin + '/ics/' +
        //   this.props.calendar.hashCode +
        //   '.ics'

        let pageLink = "https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&name=" + this.props.calendar.name + "&url=" + this.state.webcalIcsFileLink ;
        window.open(pageLink, '_blank') //to open new page
    }

    downloadAsICSFile () {
        window.open(window.location.origin + '/ics/' + this.props.calendar.hashCode + '.ics', '_blank')
    }

    render () {
        if (this.state.toHome) {
            return <Redirect to='/'/>
        }
        const {calendar, company} = this.props
        return <div className="public-detail-page">
            <Navigation/>
            <Container>
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
                <Row style={{marginTop: 20}}>
                    <Col xs={12} style={{paddingLeft: 0}}>
                        <Button color="light" block className="width-auto-but" onClick={() => this.goBackToHome()} ><i className="icon-arrow-left"></i><Trans i18nKey="home.back_to_company_selected_calendar_view"/></Button>
                    </Col>
                </Row>
                <Row style={{backgroundColor:'#ffffff', paddingTop: 15, paddingBottom: 15, marginTop: 20}}>
                    <Col xs={12}>
                        {this.renderModalBodyByStep()}
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default withTranslation()(Page)