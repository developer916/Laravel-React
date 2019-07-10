// import libs
import { connect } from "react-redux"

// import components
import Page from "./Page"



const mapStateToProps = state => {
    const { auth, calendar } = state

    return {
        calendarList : calendar.calendarList,
        companyId: auth.companyId,
        role: auth.role,
        uuid: auth.uuid,
    }
}


export default connect(mapStateToProps)(Page)
