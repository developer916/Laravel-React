import Model from '../../utils/Model'
import Company from '../../modules/company/Company'

class User extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.email = props.email || ''
    this.role = props.role || ''
    this.phone = props.phone || ''
    this.about = props.about || ''
    this.status = props.status || ''

    // related to company model
    this.company = props.company ? new Company(props.company) : null
  }
}

export default User
