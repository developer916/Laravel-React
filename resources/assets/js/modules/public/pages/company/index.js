import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
    const { auth, publicReducer, shbReducer } = state
    const {params} = router.match;
    return {
        companyName : params.company,
        editor: shbReducer.editor,
        uuid: auth.uuid,
        company: publicReducer.company,
        calendars: publicReducer.calendars,
        maintenance: publicReducer.maintenance,
        categories: publicReducer.categories,
    }
}


export default connect(mapStateToProps)(Page)