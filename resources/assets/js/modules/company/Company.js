import Model from '../../utils/Model'

class Company extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.street = props.street || ''
    this.postalCode = props.postalCode || ''
    this.city = props.city || ''
    this.country = props.country || ''
    this.phone = props.phone || ''
    this.email = props.email || ''
    this.website = props.website || ''
    this.taxId = props.taxId || ''
    this.iban = props.iban || ''
    this.bic = props.bic || ''
    this.licenseModel = props.licenseModel || ''
    this.licenseExpireDate = props.licenseExpireDate || ''
    this.salesforce = props.salesforce || ''
    this.description = props.description || '',
    this.smtpServer = props.smtpServer || ''
    this.smtpUser = props.smtpUser || ''
    this.smtpPassword = props.smtpPassword || ''
    this.smtpFromEmail = props.smtpFromEmail || ''
  }
}

export default Company
