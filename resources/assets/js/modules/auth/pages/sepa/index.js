// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    companyId: state.auth.companyId,
    confirmationLink: state.auth.confirmationLink,
  }
}

export default connect(mapStateToProps)(Page)
