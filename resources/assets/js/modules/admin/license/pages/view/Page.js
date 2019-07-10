// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Row, Col,
  Card, CardHeader, CardBody,
  ListGroup, ListGroupItem
} from 'reactstrap';

import { licenseEditRequest } from '../../service'
import {Trans, withTranslation} from 'react-i18next';

class Page extends Component {
  static displayName = 'ViewLicense'
  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    license: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.loadLicense()
  }

  loadLicense() {
    const { match, license, dispatch } = this.props

    if (!license.id) {
      dispatch(licenseEditRequest(match.params.id))
    }
  }

  render() {
    let { license } = this.props

    return <div className="animated fadeIn">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              { license.name }
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem><Trans i18nKey="common.description"/>: { license.description }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.price"/>: { license.price }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.language"/>: { license.language }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.number_of_calendars"/>: { license.numberOfCalendars }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.number_of_events"/>: { license.numberOfEvents }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.number_of_subscribers"/>: { license.numberOfSubscribers }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.enabled_email"/> ?: { license.enabledHtml === 1 ? 'true' : 'false' }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.enabled_website"/> ?: { license.enabledWebsite === 1 ? 'true' : 'false' }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.enabled_social"/> ?: { license.enabledSocial === 1 ? 'true' : 'false' }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.enabled_editor"/> ?: { license.enabledFunction }</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  }
}

export default withTranslation()(Page)
