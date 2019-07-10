import React, { Component } from "react"
import PropTypes from "prop-types"
import {Redirect} from 'react-router-dom'
import _ from 'lodash'

import {
  Row, Col,
  TabContent, TabPane,
  Nav, NavItem, NavLink
} from 'reactstrap';
import classnames from 'classnames';

// import notifications
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import LHtmlEditor from "./components/LHtmlEditor";
import LHtmlStyle from "./components/LHtmlStyle";

import {loadEditor} from "./components/service"
import {Trans} from 'react-i18next';

class Page extends Component {
  static displayName = "SubscriptionCodeGenerator"
  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    license: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    calendar: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'email'
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.updateEditor(this.state.activeTab)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });

      this.updateEditor(tab)
    }
  }

  updateEditor(type) {
    const {match, dispatch} = this.props

    dispatch(loadEditor({
      calendarId: match.params.id,
      templateType: type
    }))
  }

  render() {
    const {calendar} = this.props

      if(calendar.id == null){
          return <Redirect to='/calendars' />
      }

    return (<div className="subscription-html-code-generator animated fadeIn">
      <NotificationContainer/>
      <Row>
        <Col md={12} className="mb-4">
          <h5><Trans i18nKey="common.calendar"/>: {calendar.name}</h5>
        </Col>
        <Col md="12" className="mb-1">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'email' })}
                onClick={() => {this.toggle('email');}}
              >
                <i className="icon-envelope"></i> <Trans i18nKey="common.email"/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'website' })}
                onClick={() => {this.toggle('website');}}
              >
                <i className="icon-globe"></i> <Trans i18nKey="calendars.website"/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'social' })}
                onClick={() => {this.toggle('social');}}
              >
                <i className="icon-social-twitter"></i> <Trans i18nKey="calendars.social"/>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent>
            <TabPane className="subscription-html-builder">
              <Row>
                <Col md={9} xs={12} className="lhtml-editor">
                  <LHtmlEditor templateType={this.state.activeTab} calendar={calendar}/>
                </Col>
                <Col md={3} xs={12} className="lhtml-style">
                  <LHtmlStyle templateType={this.state.activeTab}/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>)
  }
}

export default Page