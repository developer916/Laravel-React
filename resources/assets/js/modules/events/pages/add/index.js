import { connect } from 'react-redux'
import Event from '../../Event'

// import components
import Page from './Page'

const mapStateToProps = (state) => {
  const { auth, events, calendar } = state
  const event = new Event({
    companyId: auth.companyId
  })
  return {
    event: event,
    calendars: calendar.calendarList,
    isSuccess: events.isSuccess,
  }
}

export default connect(mapStateToProps)(Page)
