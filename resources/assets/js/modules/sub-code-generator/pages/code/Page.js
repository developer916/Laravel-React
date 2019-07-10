import React, { Component } from "react"
import PropTypes from "prop-types"
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

class Page extends Component {
  static displayName = "SubscriptionCodeGenerator"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
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
    const {dispatch} = this.props

    dispatch(loadEditor({
      templateType: type
    }))
  }

  render() {
    return (<div className="subscription-html-code-generator animated fadeIn">
      <NotificationContainer/>
      <Row>
        <Col md="12" className="mb-4">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'email' })}
                onClick={() => {this.toggle('email');}}
              >
                <i className="icon-envelope"></i> Email
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'website' })}
                onClick={() => {this.toggle('website');}}
              >
                <i className="icon-globe"></i> Website
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'social' })}
                onClick={() => {this.toggle('social');}}
              >
                <i className="icon-social-twitter"></i> Social
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent>
            <TabPane className="subscription-html-builder">
              <Row>
                <Col md={9} xs={12} className="lhtml-editor">
                  <LHtmlEditor templateType={this.state.activeTab}/>
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