// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
    const { auth } = state

    return {
        uuid: auth.uuid,
    }
}

export default connect(mapStateToProps)(Page)