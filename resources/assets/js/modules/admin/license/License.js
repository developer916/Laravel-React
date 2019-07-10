import Model from '../../../utils/Model'

class License extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.description = props.description || ''
    this.price = props.price || ''
    this.language = props.language || ''
    this.numberOfCalendars = props.numberOfCalendars || ''
    this.numberOfEvents = props.numberOfEvents || ''
    this.numberOfSubscribers = props.numberOfSubscribers || ''
    this.enabledHtml = props.enabledHtml || 0
    this.enabledWebsite = props.enabledWebsite || 0
    this.enabledSocial = props.enabledSocial || 0
    this.enabledFunction = props.enabledFunction || 'off'
  }
}

export default License
