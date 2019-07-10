import Model from '../../utils/Model'

class Calendar extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.companyId = props.companyId || ''
    this.name = props.name || ''
    this.description = props.description || ''
    this.tags = props.tags || ''
    this.picture = props.picture || ''
    this.public = props.public || ''
    this.status = props.status || ''
    this.not = props.not || ''
    this.hashCode = props.hashCode || ''
  }
}

export default Calendar
