// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { auth, superDashboard } = state

  return {
    calendars: superDashboard.calendars,
    subscribers: superDashboard.subscribers,
    upcomingEvents: superDashboard.upcomingEvents,
    companyId: auth.companyId,
    role : auth.role,
  }
}

export default connect(mapStateToProps)(Page)
