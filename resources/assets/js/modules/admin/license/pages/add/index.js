import { connect } from 'react-redux'

import License from '../../License'

// import components
import Page from './Page'

const mapStateToProps = () => {
  const license = new License({})

  return {
    license: license
  }
}

export default connect(mapStateToProps)(Page)
