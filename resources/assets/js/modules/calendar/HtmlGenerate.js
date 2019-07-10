import Model from '../../utils/Model'

class HtmlGenerate extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.companyId = props.companyId || ''
    this.calendarId = props.calendarId || ''
    this.type = props.type || ''
    this.htmlCode = props.htmlCode || ''
    this.htmlJson = props.htmlJson || ''
  }
}

export default HtmlGenerate
