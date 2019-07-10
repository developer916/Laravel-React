// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { auth, user } = state

  return {
    userId : auth.userId,
    companyId: auth.companyId,
    role: auth.role,
    users: user.users
  }
}

export default connect(mapStateToProps)(Page)
