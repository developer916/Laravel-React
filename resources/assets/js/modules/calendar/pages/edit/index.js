// import libs
import { connect } from "react-redux"
import Calendar from '../../Calendar'
// import components
import Page from "./Page"

const mapStateToProps = (state, router) => {
    const { publicReducer } = state

    return {
        categories: publicReducer.categories,
        selectedCalendar: state.calendar.selectedCalendar,
        calendarCategories : state.calendar.calendarCategories,
        companyId: state.auth.companyId,
    }
}

export default connect(mapStateToProps)(Page)
