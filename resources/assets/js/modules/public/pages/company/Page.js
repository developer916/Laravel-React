import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'

import ReeValidate from 'ree-validate'
import _ from 'lodash'
import {
    Container,
    Row, Col,
    Input,
    Card,
    CardBody, CardTitle, CardFooter,
    ModalHeader, ModalFooter, ModalBody, Modal,
    Button
} from 'reactstrap';

// import components
import Navigation from '../../../../common/navigation'
import Header from "../home/components/Header"
import SearchForm from "../home/components/SearchForm"

import LHtmlRender from "../../../sub-code-generator/pages/code/components/LHtmlRender"

import {listPublicCalendars, subscribeCalendar, submitSubscriber, getPublicIp, getCategories} from "../../service"
import {getEditor} from "../../../sub-code-generator/pages/code/components/service";
import { Trans, withTranslation} from "react-i18next";
import i18n from "../../../../i18n";

const templateType = 'website'
const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';


class Page extends Component {
    static displayName = "PublicCompanyCalendars"
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        calendars: PropTypes.array.isRequired,
        uuid: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);

        this.subscriberValidator = new ReeValidate({
            email: 'required|email',
        });

        this.state = {
            searchForm: {
                company: this.props.companyName,
                search: '',
                categories: []
            },
            subscriber: {
                name: '',
                email: '',
                description: ''
            },
            selectedCalendar: {},
            icsFileLink: '',
            webcalIcsFileLink: '',
            isSubscribeModalOpen: false,
            isHelpModalOpen : false,
            helpType :'',
            subscribeModalStep: 1,
            subscriberErrors: this.subscriberValidator.errors,
            referrer: false,
            publicIp: '',
            getErrorFromSubmitSubscriber: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeSubscriber = this.onChangeSubscriber.bind(this)
        this.onSubmitSubscriber = this.onSubmitSubscriber.bind(this)
        this.renderModalBodyByStep = this.renderModalBodyByStep.bind(this)
        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
    }
    componentWillMount() {
        const { dispatch, match } = this.props
        let params = {
            company : match.params.company
        }
        
        dispatch(listPublicCalendars(params));
        dispatch(getCategories({}));
        // this.props.dispatch(getPublicIp())
        //   .then(res => {
        //     this.setState({ publicIp: res.ip });
        //   }).catch(err => {
        //       console.log(err);
        //   });
    }

    handleChange(name, value) {
        // const {errors} = this.validator;

        this.setState({searchForm: {...this.state.searchForm, [name]: value}});
        // errors.remove(name);

        // this.validator.validate(name, value)
        //   .then(() => {
        //     this.setState({errors})
        //   })
    }

    handleSubmit(e) {
        e.preventDefault()

        const {searchForm} = this.state;
        // const {errors} = this.validator;
        const {dispatch} = this.props;

        // this.validator.validateAll(searchForm)
        //   .then((success) => {
        //     if (success) {
        dispatch(listPublicCalendars(searchForm));
        //   } else {
        //     this.setState({errors})
        //   }
        // })
    }




    handleMultiSelectChange( value){
        const {dispatch} = this.props;
        let category =  [];
        for(var i = 0; i < value.length; i++){
            category.push(value[i].value);
        }
        this.handleChange('categories', category);

        let params = {
            company : this.props.companyName,
            search : this.state.searchForm.search,
            categories : category
        }
        dispatch(listPublicCalendars(params));
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

    toggleDetailView(){
        this.setState({
            referrer: true
        });
    }
    toggleSubscribeModal(data=null) {
        if (_.isEmpty(data)) {
            this.setState({
                isSubscribeModalOpen: !this.state.isSubscribeModalOpen,
                subscribeModalStep: 1,
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

            let icsFileLink = "";
            let webcalIcsFileLink = "";

            const { errors } = this.subscriberValidator;

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
                    webcalIcsFileLink : webcalIcsFileLink,
                })
            } else {
                icsFileLink = window.location.origin + "/ics/"+ uuid + "/" + data.calendar.hashCode + ".ics";
                webcalIcsFileLink = 'webcal://' + window.location.host + "/ics/"+ uuid + "/" + data.calendar.hashCode;
                this.setState({
                    // isSubscribeModalOpen: true,
                    subscribeModalStep: 1,
                    selectedCalendar: data.calendar,
                    icsFileLink: icsFileLink,
                    webcalIcsFileLink : webcalIcsFileLink,
                })
            }

            // alert subscribe to server


            // dispatch(getEditor({
            //   hashCode: data.calendar.hashCode,
            //   templateType: templateType
            // }))

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
        }
    }

    viewCalendar(data=null) {
        this.setState({
            referrer: true,
            selectedCalendar: data.calendar,
        });
    }

    syncWithGoogleCalendar() {
        let pageLink = "https://www.google.com/calendar/render?cid=" + this.state.webcalIcsFileLink;
        window.open(pageLink, "_blank") //to open new page
    }

    syncWithAppleIcloud(){
        let pageLink = this.state.webcalIcsFileLink;
        window.open(pageLink, "_blank");
    }

    syncWithOutlookCalendar() {
        // let pageLink = "https://calendar.live.com/calendar/calendar.aspx?rru=addsubscription&name=" + this.state.selectedCalendar.name + "&url=" + this.state.webcalIcsFileLinkWithoutPoint   ;
        let pageLink = "https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&name=" + this.state.selectedCalendar.name + "&url=" + this.state.webcalIcsFileLink ;
        window.open(pageLink, "_blank") //to open new page
    }

    downloadAsICSFile() {
        window.open(this.state.icsFileLink, "_blank");
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

                } else {
                    this.setState({ subscriberErrors : errors })
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
                            <Input type="text" name="email" className={`${subscriberErrors.has('email') && 'is-invalid'}`}  placeholder={t('home.put_your_email')} value={subscriber.email} onChange={(e) => this.onChangeSubscriber(e.target.name, e.target.value)}/>
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

    renderCalendars() {
        let calendars = this.props.calendars.map(data => {
            return (
                <Col md="4" xs="12" key={data.calendar.id}>
                    <Card>
                        <CardBody
                            style={{ backgroundImage: `url(uploads/${data.calendar.picture})`, height: '130px', backgroundSize: 'cover' }}>
                            <CardTitle>{ data.calendar.name }</CardTitle>
                            <div>{ data.calendar.description }</div>
                            <div><Trans i18nKey="home.created_by" /> <b>{ data.company.name }</b></div>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col md="6" xs="12">
                                    <Button color="light" block onClick={() => this.viewCalendar(data)}><i className="icon-eye"></i> <Trans i18nKey="home.view"/></Button>
                                </Col>
                                <Col md="6" xs="12">
                                    <Button color="light" block onClick={() => this.toggleSubscribeModal(data)}><i className="icon-link"></i> <Trans i18nKey="home.get_link"/></Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            )});
        return (
            <Row>
                { calendars }
            </Row>
        );
    }

    render() {
        const { referrer } = this.state
        if (referrer) {
            let publicViewCalendarPath = "/calendar/" + this.state.selectedCalendar.hashCode + "/detail"
            return <Redirect to={ publicViewCalendarPath }/>;
        }

        const { search } = this.state.searchForm
        const {categories} = this.props;
        let categoriesData = [];

        if(categories.length >0){
            for(var i=0; i< categories.length; i++){
                let obj = { value: categories[i].id, label: categories[i].name };
                categoriesData.push(obj);
            }
        }

        const props = {
            search,
            categories : categoriesData,
            // errors: this.state.errors,
            handleMultiSelectChange : this.handleMultiSelectChange,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
        };

        if(this.props.maintenance =='false'){
            return (<div>
                <Navigation/>
                <Header/>
                <Container fluid>
                    <Modal isOpen={this.state.isSubscribeModalOpen} toggle={() => this.toggleSubscribeModal()}
                           className={'modal-lg'}>
                        <ModalHeader toggle={() => this.toggleSubscribeModal()}><Trans i18nKey="home.subscribe_calendar"/></ModalHeader>
                        <ModalBody>
                            {this.renderModalBodyByStep()}
                        </ModalBody>
                        <ModalFooter>
                            {/*<Button color="primary" onClick={() => this.toggleDetailView()}><Trans i18nKey="home.go_to_detail_view"/></Button>*/}
                            <Button color="secondary" onClick={() => this.toggleSubscribeModal()}><Trans i18nKey="home.cancel"/></Button>
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
                    <div className="mt-3">
                        <Col lg="8" md="12" xs="12">
                            <SearchForm {...props}/>
                        </Col>
                    </div>
                    <div className="mt-3">
                        <Col md="12">
                            { this.renderCalendars() }
                        </Col>
                    </div>
                </Container>
            </div>);
        } else{
            return (
                <div>
                    <main style={{ minHeight : '100vh', width : '100%', height: '100%', background: '#611f69'}}>
                        <h1 style={{position: 'absolute', color: 'white', margin: 0, top: '50%', width: '100%', textAlign: 'center'}}><Trans i18nKey="home.maintenance_now_site_will_be_online_asap"/></h1>
                    </main>
                </div>
            );
        }

    }
}

export default  withTranslation()(Page)
