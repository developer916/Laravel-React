// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import {
  Row, Col,
  Button, ButtonDropdown,
  DropdownToggle, DropdownMenu, DropdownItem,
  Card, CardHeader, CardFooter, CardBody,
  Collapse,
  Form, FormGroup, FormText,
  Label, Input, InputGroup, InputGroupAddon, InputGroupButton
} from 'reactstrap';

import {companySettingsGetRequest, companySettingsUpdateRequest} from "../../service";
import {Trans, withTranslation } from 'react-i18next';

// import components
import LoadingComponent from '../../../../../common/loader'

class Page extends Component {
  static displayName = 'SettingsCompany'
  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    licenses: PropTypes.array.isRequired,
    companySettings: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.renderLicenseFormGroup = this.renderLicenseFormGroup.bind(this)
  }

  componentWillMount() {
    this.loadCompanySettings()
  }

  loadCompanySettings() {
    const {match, dispatch} = this.props

    dispatch(companySettingsGetRequest(match.params.id))
  }

  onChange(name, value) {
    const {dispatch, companySettings} = this.props

    let params = {
      companyId: companySettings.id,
      [name]: value
    }
    dispatch(companySettingsUpdateRequest(params))
  }

  renderLicenseFormGroup() {
    const {companySettings, licenses, t} = this.props
    const lmOptions = licenses.map(license => {
      return <option value={license.id} key={`lm-opt-${license.id}`}>
        {license.name}
      </option>
    });

    return <FormGroup>
      <Label htmlFor="licenseSelect"><Trans i18nKey="admin.select_licenses"/></Label>
      <Input type="select" name="licenseModel" id="licenseSelect" value={_.isEmpty(companySettings.licenseModel) ? '' : (!companySettings.licenseModel.id ? '' : companySettings.licenseModel.id)} onChange={(e) => this.onChange(e.target.name, e.target.value)}>
        <option value="" key="lm-opt-0">-- {t('select_licenses')} --</option>
        {lmOptions}
      </Input>
    </FormGroup>
  }

  renderLicenseDetail() {
    const {companySettings} = this.props

    if (_.isEmpty(companySettings.licenseModel)) {
      return <div>
        <p><Trans i18nKey="admin.non_selected_license"/></p>
      </div>
    } else {
      return <div>
        <p><Trans i18nKey="common.name"/>: <b>{companySettings.licenseModel.name}</b></p>
        <p><Trans i18nKey="common.description"/>: <b>{companySettings.licenseModel.description}</b></p>
        <p><Trans i18nKey="admin.language"/>: <b>{companySettings.licenseModel.language}</b></p>
        <p><Trans i18nKey="admin.price"/>: <b>{companySettings.licenseModel.price}</b></p>
        <p><Trans i18nKey="admin.number_of_calendars"/>: <b>{companySettings.licenseModel.numberOfCalendars}</b></p>
        <p><Trans i18nKey="admin.number_of_events"/>: <b>{companySettings.licenseModel.numberOfEvents}</b></p>
        <p><Trans i18nKey="admin.number_of_subscribers"/>: <b>{companySettings.licenseModel.numberOfSubscribers}</b></p>
        <p><Trans i18nKey="admin.enabled_email"/>?: <b>{companySettings.licenseModel.enabledHtml === 1 ? 'true' : 'false'}</b></p>
        <p><Trans i18nKey="admin.enabled_website"/>?: <b>{companySettings.licenseModel.enabledWebsite === 1 ? 'true' : 'false'}</b></p>
        <p><Trans i18nKey="admin.enabled_social"/>?: <b>{companySettings.licenseModel.enabledSocial === 1 ? 'true' : 'false'}</b></p>
        <p><Trans i18nKey="admin.enabled_editor"/>?: <b>{companySettings.licenseModel.enabledFunction}</b></p>
      </div>
    }
  }

  render() {
    const {companySettings} = this.props

    if (_.isEmpty(companySettings)) {
      return <div className="animated fadeIn">
        <LoadingComponent/>
      </div>
    } else {
      return <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong><Trans i18nKey="admin.company_info"/></strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name"><Trans i18nKey="common.name"/></Label>
                      <Input type="text" id="name" defaultValue={companySettings.name} disabled/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="address"><Trans i18nKey="admin.address"/></Label>
                      <Input type="text" id="address" defaultValue={companySettings.street + ', ' + companySettings.city + ', ' + companySettings.country} disabled/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="email"><Trans i18nKey="common.email"/></Label>
                      <Input type="text" id="email" defaultValue={companySettings.email} disabled/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="phone"><Trans i18nKey="admin.phone"/></Label>
                      <Input type="text" id="phone" defaultValue={companySettings.phone === null ? '' : companySettings.phone} disabled/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="website"><Trans i18nKey="calendars.website"/></Label>
                      <Input type="text" id="website" defaultValue={companySettings.website === null ? '' : companySettings.website} disabled/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="expiredDate"><Trans i18nKey="admin.expired_date"/></Label>
                      <Input type="text" id="expiredDate" defaultValue={companySettings.licenseExpireDate === null ? '' : companySettings.licenseExpireDate} disabled/>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong><Trans i18nKey="admin.company_settings"/></strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    {this.renderLicenseFormGroup()}
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    {this.renderLicenseDetail()}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    }
  }
}


export default withTranslation()(Page)
