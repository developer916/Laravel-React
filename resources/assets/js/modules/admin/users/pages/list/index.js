// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const { auth, superUser } = state

  return {
    userId : auth.userId,
    companyId: auth.companyId,
    role: auth.role,
    users: superUser.users
  }
}

export default connect(mapStateToProps)(Page)
