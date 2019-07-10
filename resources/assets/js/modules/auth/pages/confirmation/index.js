// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  return {
    confirmationLink: state.auth.confirmationLink
  }
}

export default connect(mapStateToProps)(Page)
