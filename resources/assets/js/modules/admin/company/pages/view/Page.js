// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { companyEditRequest } from '../../service'
import { Redirect } from 'react-router-dom'
import { Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, } from 'reactstrap';
import {Trans, withTranslation} from 'react-i18next';

class Page extends Component {
  static displayName = 'ViewCompany'
  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.loadCompany()
  }

  loadCompany() {
    const { match, company, dispatch } = this.props

    if (!company.id) {
      dispatch(companyEditRequest(match.params.id))
    }
  }

  render() {
    let { company } = this.props;
    return(<div className="animated fadeIn">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              { company.name }
            </CardHeader>
            <CardBody>
              <div dangerouslySetInnerHTML={{__html: company.description}}/>
              <ListGroup>
                <ListGroupItem><Trans i18nKey="admin.location"/>: { company.street }, { company.city }, { company.country }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.postal_code"/>: { company.postalCode }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.phone"/>: { company.phone }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="common.email"/>: { company.email }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="calendars.website"/>: { company.website }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="auth.tax_id"/>: { company.taxId }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.iban"/> & <Trans i18nKey="admin.bic"/>: { company.iban } & { company.bic }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.license_model"/>: { company.licenseModel.name }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.license_expired_at"/>: { company.licenseExpireDate }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.salesforce"/>: { company.salesforce }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.smtp_server"/>: { company.smtpServer }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.smtp_user"/>: { company.smtpUser }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.smtp_password"/>: { company.smtpPassword }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="admin.smtp_from_email"/>: { company.smtpFromEmail }</ListGroupItem>
                <ListGroupItem><Trans i18nKey="common.status"/>: { company.status }</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>)
  }
}

export default withTranslation()(Page)
