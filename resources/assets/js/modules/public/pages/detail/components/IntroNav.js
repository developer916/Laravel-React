import React from "react"
import { Row, Col, ButtonGroup, Button } from 'reactstrap';
import {Trans, withTranslation} from "react-i18next";
const displayName = "DetailOfCalendarIntroNav"

function IntroNav(props) {
  let eventCnt = props.events.length

  return <div className="intro-nav">
    <Row>
      {/*<Col md={3} sm={12}/>*/}
      <Col md={12} sm={12}>
        <ButtonGroup style={{ float: "right" }}>
          {/*<Button color="light" block><Trans i18nKey="home.company_link_to_company_selected_view"/></Button>*/}
          {/*<Button color="light" block><Trans i18nKey="home.event_view_calendar"/></Button>*/}
          <Button color="light" block><Trans i18nKey="home.event_view_events"/> ({ eventCnt })</Button>
          <Button color="primary" block onClick={() => props.toggleSubscribeModal()}><i className="icon-link"></i> <Trans i18nKey="home.subscription_modal"/></Button>
        </ButtonGroup>
      </Col>
    </Row>
  </div>
}
IntroNav.displayName = displayName

export default withTranslation()(IntroNav)
