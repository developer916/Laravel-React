// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { auth, codeGenerator, shbReducer } = state

  return {
    companyId: auth.companyId,
    data: codeGenerator.codeData,
    selected: shbReducer.selected,
  }
}

export default connect(mapStateToProps)(Page)
