// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { auth, calendar, superCharts } = state

  return {
    companyId: auth.companyId,
    data: superCharts.data,
    calendars: calendar.calendarList,
    searchType: superCharts.searchType,
    searchCalendarId: superCharts.searchCalendarId,
  }
}

export default connect(mapStateToProps)(Page)
