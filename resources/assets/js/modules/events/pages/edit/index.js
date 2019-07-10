import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  const { events, calendar } = state

  // configure event
  let event = events.event;
  event.id = params.id;
  return {
    event: event,
    eventReminders: events.eventReminders,
    calendars: calendar.calendarList,
    isSuccess: events.isSuccess,
  }
}

export default connect(mapStateToProps)(Page)
