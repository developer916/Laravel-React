import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
    const { auth } = state

    return {
        role : auth.role,
    }
}

export default connect(mapStateToProps)(Page)
