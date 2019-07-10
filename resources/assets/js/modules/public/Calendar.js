import Model from '../../utils/Model'
import Company from '../../modules/company/Company'

class Calendar extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.description = props.description || ''
    this.tags = props.tags || ''
    this.picture = props.picture || ''
    this.public = props.public || 'true'
    this.status = props.status || 'true'
    this.not = props.not || 'true'

    // relate user model
    this.user = props.company ? new Company(props.company) : null
  }
}

export default Calendar
