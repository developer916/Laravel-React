import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { auth, publicReducer, shbReducer } = state
  const { params } = router.match

  return {
    hashCode: params.hashCode,
    editor: shbReducer.editor,
    uuid: auth.uuid,
    company: publicReducer.company,
    calendar: publicReducer.calendar,
    events: publicReducer.events
  }
}

export default connect(mapStateToProps)(Page)