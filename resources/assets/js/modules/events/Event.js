import moment from 'moment'
import Model from '../../utils/Model'

class Event extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.companyId = props.companyId || ''
    this.calendarId = props.calendarId || ''
    this.summary = props.summary || ''
    this.description = props.description || ''
    this.destination = props.destination || ''
    this.dateFrom = props.dateFrom ? moment(props.dateFrom) : null
    this.dateTo = props.dateTo ? moment(props.dateTo) : null
    this.not1 = props.not1 || ''
    this.not2 = props.not2 || ''
    this.not3 = props.not3 || ''
    this.not = props.not || ''
  }
}

export default Event
