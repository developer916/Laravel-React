import { connect } from 'react-redux'
import Company from '../../Company'

// import components
import Page from './Page'

const mapStateToProps = () => {
  const company = new Company({})
  return {
    company
  }
}

export default connect(mapStateToProps)(Page)
