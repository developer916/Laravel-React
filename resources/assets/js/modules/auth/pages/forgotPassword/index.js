// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
  }
}

export default connect(mapStateToProps)(Page)
