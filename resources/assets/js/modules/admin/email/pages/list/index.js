import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state) => {
    const data = state.superLicense.data

    return {
        licenses: data,
    }
}

export default connect(mapStateToProps)(Page)
