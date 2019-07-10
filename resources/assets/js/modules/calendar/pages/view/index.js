// import libs
import { connect } from "react-redux"

// import components
import Page from "./Page"

const mapStateToProps = state => {
  const {auth} = state

  return {
    license: auth.license,
    role : auth.role,
    uuid: auth.uuid,
    calendarEvents: state.calendar.calendarEvents,
    selectedCalendar: state.calendar.selectedCalendar,
    editor: state.shbReducer.editor
  }
}

export default connect(mapStateToProps)(Page)
