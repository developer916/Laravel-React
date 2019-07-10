import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const {licenses, companySettings} = state.superCompany

  return {
    licenses: licenses,
    companySettings: companySettings
  }
}

export default connect(mapStateToProps)(Page)
