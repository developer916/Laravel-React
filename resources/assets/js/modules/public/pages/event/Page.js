import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import {
  Container,
  Card, CardBody, CardHeader,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';

import Navigation from '../../../../common/navigation'
import { getEventByHashCode } from "../../service";
import {Trans , withTranslation } from "react-i18next";
import _ from 'lodash';


class Page extends Component {
  static displayName = "PublicViewEvent"

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    hashCode: PropTypes.string.isRequired,
    event: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.convertDateFromUTCToLocal = this.convertDateFromUTCToLocal.bind(this)
  }

  convertDateFromUTCToLocal(date){
      var localTime  = moment.utc(date).toDate();
      localTime = moment(localTime);
      // return localTime.format('YYYY-MM-DD HH:mm');
      return localTime.format('DD.MM.YYYY HH:mm');
  }
  componentWillMount() {
    const { hashCode, dispatch } = this.props

    dispatch(getEventByHashCode({hashCode: hashCode}));
  }

  render() {
    const { event } = this.props;

    let  calendarViewLink = "";
    if(! _.isEmpty(event.calendar)){
        calendarViewLink = "/calendar/" + event.calendar.hashCode + '/detail'
    }


    return (<div className="public-event-view">
      <Navigation/>
      <Container fluid style={{paddingTop: '15px'}}>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong><Trans i18nKey="home.event_view"/></strong>
            <div className="card-actions">
              <a href={calendarViewLink} style={{width: '100px'}}>
                <small className="text-muted"><Trans i18nKey="home.view_calendar"/></small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem><Trans i18nKey="home.event_summary"/>: {event.summary}</ListGroupItem>
              <ListGroupItem><Trans i18nKey="home.event_description"/>: {event.description}</ListGroupItem>
              <ListGroupItem><Trans i18nKey="home.event_date_from"/>: { this.convertDateFromUTCToLocal(event.dateFrom)}</ListGroupItem>
              <ListGroupItem><Trans i18nKey="home.event_date_to"/>:  { this.convertDateFromUTCToLocal(event.dateTo) }</ListGroupItem>
              {/*<ListGroupItem>Not 1: {event.not1}</ListGroupItem>*/}
              {/*<ListGroupItem>Not 2: {event.not2}</ListGroupItem>*/}
              {/*<ListGroupItem>Not 3: {event.not3}</ListGroupItem>*/}
              <ListGroupItem><Trans i18nKey="home.event_created_at"/>: {event.createdAt}</ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Container>
    </div>)
  }
}

export default withTranslation()(Page)
