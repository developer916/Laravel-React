// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { auth, superDatamap, calendar } = state

  return {
    data: superDatamap.data,
    maxValue: superDatamap.maxValue,
    searchType: superDatamap.searchType,
    searchCalendarId: superDatamap.searchCalendarId,
    companyId: auth.companyId,
    calendars: calendar.calendarList
  }
}

export default connect(mapStateToProps)(Page)
