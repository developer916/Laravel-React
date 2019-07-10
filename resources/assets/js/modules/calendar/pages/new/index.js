// import libs
import { connect } from "react-redux"

// import components
import Page from "./Page"

const mapStateToProps = (state) => {

    const { publicReducer } = state

    return {
        categories: publicReducer.categories,
    }
}

export default connect(mapStateToProps)(Page)
