// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { auth, settingsReducer } = state

  return {
    userId: auth.userId,
    companyId: auth.companyId,
    company : settingsReducer.company,
  }
}

export default connect(mapStateToProps)(Page)
