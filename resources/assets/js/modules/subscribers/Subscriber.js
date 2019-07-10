import Model from '../../utils/Model'
import Calendar from '../calendar/Calendar'

class Subscriber extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.companyId = props.companyId || ''
    this.calendarId = props.calendarId || ''
    this.name = props.name || ''
    this.email = props.email || ''
    this.description = props.description || ''
    this.status = props.status || ''
    this.updatedAt = props.updatedAt || ''
    this.calendar = props.calendar || new Calendar({})
  }
}

export default Subscriber
