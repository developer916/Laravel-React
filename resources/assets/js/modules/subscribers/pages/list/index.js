import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state) => {
  const data = state.subscribers.data

  return {
    subscribers: data,
  }
}

export default connect(mapStateToProps)(Page)
