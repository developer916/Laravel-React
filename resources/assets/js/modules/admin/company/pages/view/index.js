import { connect } from 'react-redux'
import Company from '../../Company'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  const company = state.superCompany.data.find(company => company.id === Number(params.id))
  return {
    company: company ? new Company(company) : new Company({})
  }
}

export default connect(mapStateToProps)(Page)
