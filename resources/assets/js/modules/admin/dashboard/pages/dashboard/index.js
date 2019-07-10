// import libs
import { connect } from "react-redux"

// import components
import Page from "./Page"

const mapStateToProps = state => {
    const { superAnalyse } = state

    return {
        calendars: superAnalyse.calendars,
        subscribers: superAnalyse.subscribers,
        upcomingEvents: superAnalyse.upcomingEvents,
    }
}

export default connect(mapStateToProps)(Page)
