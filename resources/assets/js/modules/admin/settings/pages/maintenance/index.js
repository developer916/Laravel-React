import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
    const { auth , superSettings} = state

    return {
        role : auth.role,
        maintenance : superSettings.maintenance
    }
}

export default connect(mapStateToProps)(Page)
