import React, { Component } from "react"
import PropTypes from "prop-types"
import ReeValidate from 'ree-validate'
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import { Line } from 'react-chartjs-2';

import {
    Row, Col,
    Card, CardHeader, CardBody, CardTitle, CardFooter,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';

import { getDashboardData } from '../../service'
import {Trans, withTranslation} from 'react-i18next';

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const mainChartOpts = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false,
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true,
            }
        }]
    },
    elements: {
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
        }
    }
}


class Page extends Component {
  static displayName = "SuperDashboard"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    calendars: PropTypes.array.isRequired,
    subscribers: PropTypes.array.isRequired,
    upcomingEvents: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.convertDateFromUTCToLocal = this.convertDateFromUTCToLocal.bind(this)
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(getDashboardData())
  }

    convertDateFromUTCToLocal(date){
        var localTime  = moment.utc(date).toDate();
        localTime = moment(localTime);
        return localTime.format('DD.MM.YYYY HH:mm');
    }

    renderUpcomingEvents() {
        const { upcomingEvents } = this.props

        let upcomingEventsList = upcomingEvents.map(each => {
            return (<ListGroupItem action key={each.id}>
              <ListGroupItemHeading>{ each.summary } - ( Calendar : {each.calendar.name} ) </ListGroupItemHeading>
              <ListGroupItemText>
                  { each.description }
              </ListGroupItemText>
              <ListGroupItemText>
                  { this.convertDateFromUTCToLocal(each.dateFrom) } - { this.convertDateFromUTCToLocal(each.dateTo) }
              </ListGroupItemText>
            </ListGroupItem>)
        })
        return (<ListGroup>
            { upcomingEventsList }
        </ListGroup>)
    }

    renderCalendars() {
        const { calendars } = this.props

        let calendarsList = calendars.map(each => {
            return (
                <Col md="4" xs="12" key={each.id}>
                  <Card>
                    <CardBody
                        style={{ backgroundImage: `url(uploads/${each.picture})`, height: '130px', backgroundSize: 'cover' }}>
                      <CardTitle>{ each.name }</CardTitle>
                      <p>{ this.convertDateFromUTCToLocal(each.time) }</p>
                    </CardBody>
                    <CardFooter>
                      <div>
                        <Row>
                          <Col style={{ paddingRight: '0' }}>
                            <div className="desc text-center" style={{ borderRight: '1px solid #e1e6ef' }}>
                              <p>Total Subscribers</p>
                              <h5>{ each.totalSubscriber }</h5>
                            </div>
                          </Col>
                          <Col style={{ paddingLeft: '0' }}>
                            <div className="desc text-center">
                              <p>New Subs - Last Week</p>
                              <h5>{ each.weekSubscriber }</h5>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
            )});
        return (
            <Row>
                { calendarsList }
            </Row>
        );
    }

    renderSubscriberChart() {
        const { calendars, subscribers } = this.props

        let labels = [], curDate = new Date();
        let weekAgoMilliSeconds =  7 * 24 * 60 * 60 * 1000;
        curDate.setTime(curDate.getTime() - weekAgoMilliSeconds);
        let currentDate = new Date(curDate);
        if (subscribers.length > 0) {
            let firstAry = subscribers[0];
            firstAry.map(each => {
                let curDateStr = currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' +  currentDate.getFullYear()
                labels.push(curDateStr)
                currentDate.setDate(currentDate.getDate() + 1)
            })
        }

        let datasets = [];
        subscribers.map((each, index) => {
            const rgbStr = `${ random(0, 255) },${ random(0, 255) }, ${ random(0, 255) }`
            let eachData = {
                label: calendars[index].name,
                backgroundColor: index === 0 ? `rgba(${rgbStr},0.2)` : 'transparent',
                borderColor: `rgba(${rgbStr},1)`,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: each
            }
            datasets.push(eachData)
        })

        const mainChart = {
            labels: labels,
            datasets: datasets
        }

        return (<div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
          <Line data={mainChart} options={mainChartOpts} height={300}/>
        </div>);
    }

  render() {
      return (<div className="dashboard animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="analytics">
                  <Row>
                    <Col md={6} xs={12} className="subscribers-graph">
                      <h3><Trans i18nKey="calendars.subscribers_chart"/></h3>
                        { this.renderSubscriberChart() }
                    </Col>
                    <Col md={6} xs={12} className="upcoming-events">
                      <h3><Trans i18nKey="events.upcoming_events"/></h3>
                        { this.renderUpcomingEvents() }
                    </Col>
                  </Row>
                </div>
              </CardBody>
              <CardFooter>
                <h3><Trans i18nKey="normal.all_calendars"/></h3>
                <div className="calendars">
                    { this.renderCalendars() }
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>)
  }
}

export default withTranslation()(Page)
