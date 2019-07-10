// import libs
import { connect } from 'react-redux'

import Page from './Page'

const mapStateToProps = state => {
    const { auth , superCategories} = state
    console.log("superCategories_state", state);

    console.log("superCategories", superCategories);

    return {
        categories: superCategories.data,
        companyId: auth.companyId,
    }
}

export default connect(mapStateToProps)(Page)