// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'

import {
  Row, Col,
  Card, CardHeader, CardBody,
  ListGroup, ListGroupItem
} from 'reactstrap';
import {Line} from 'react-chartjs-2';

import { subscriberEditRequest } from '../../service'
import { Trans, withTranslation} from "react-i18next";

const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class Page extends Component {
  static displayName = 'ViewSubscriber'
  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    subscriber: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.loadSubscriber()
  }

  loadSubscriber() {
    const { match, subscriber, dispatch } = this.props

    if (!subscriber.id) {
      dispatch(subscriberEditRequest(match.params.id))
    }
  }

  render() {
    let { subscriber } = this.props

    return <div className="animated fadeIn">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              { subscriber.name }
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem><Trans i18nKey="common.email"/>: { subscriber.email }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="common.description"/>: { subscriber.description }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="common.calendar"/>: { subscriber.calendar.name }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="common.status"/>: { _.isEmpty(subscriber.status) ? 'off' : subscriber.status }</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  }
}

export default withTranslation()(Page)
