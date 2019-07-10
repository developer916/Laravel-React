// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { publicReducer, auth, shbReducer } = state

  return {
    editor: shbReducer.editor,
    calendars: publicReducer.calendars,
    uuid: auth.uuid,
    maintenance: publicReducer.maintenance,
    categories: publicReducer.categories,
  }
}

export default connect(mapStateToProps)(Page)
