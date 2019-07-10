// import libs
import { connect } from 'react-redux'
import Company from '../../Company'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { data } = state.superCompany
  const { auth } = state

  return {
    companies: data.map((company) => new Company(company)),
    companyId: auth.companyId,
  }
}

export default connect(mapStateToProps)(Page)
