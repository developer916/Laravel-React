import { connect } from 'react-redux'

import License from '../../License'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  const license = state.superLicense.data.find(license => license.id === Number(params.id))

  return {
    license: license ? new License(license) : new License({})
  }
}

export default connect(mapStateToProps)(Page)
