// import libs
import { connect } from "react-redux"

// import components
import Page from "./Page"

const mapStateToProps = state => {
    const { superAnalyse } = state

    return {
        data: superAnalyse.data,
        calendars: superAnalyse.calendarList,
        searchType: superAnalyse.searchType,
        searchCalendarId: superAnalyse.searchCalendarId,
    }
}

export default connect(mapStateToProps)(Page)

