/* ============
 * Container
 * ============.
 *
 * Containers are used fetch the data from state
 * and disperse to the components.
 */

// import libs
import { connect } from 'react-redux'
import User from '../../../../user/User'


// import components
import Page from './Page'

// map store state as properties of the component
const mapStateToProps = state =>{
  const { auth, superUser } = state
  return {
    user: new User({}),
    role : auth.role,
    companies: superUser.companies
  }
}

// binding store with component
export default connect(mapStateToProps)(Page)
