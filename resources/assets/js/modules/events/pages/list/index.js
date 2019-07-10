// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { auth, events, shbReducer } = state

  return {
    upcomingEvents: events.upcomingEvents,
    pastEvents: events.pastEvents,
    search: events.search,
    companyId: auth.companyId,
    role: auth.role,
    editor: shbReducer.editor,
    uuid: auth.uuid,
  }
}

export default connect(mapStateToProps)(Page)
