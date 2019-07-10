import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { auth, publicReducer } = state
  const { params } = router.match

  return {
    uuid: auth.uuid,
    hashCode: params.hashCode,
    event: publicReducer.event
  }
}

export default connect(mapStateToProps)(Page)