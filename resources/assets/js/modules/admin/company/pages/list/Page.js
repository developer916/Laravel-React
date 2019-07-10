import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import {
  Button,
  Card, CardHeader, CardBody,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Label, Input
} from 'reactstrap';
import {
  BootstrapTable, TableHeaderColumn
} from 'react-bootstrap-table';

import { companyListRequest, companyRemoveRequest, companyUpdateRequest, companyUpdateStatusRequest } from '../../service'
import {Trans, withTranslation} from 'react-i18next';


class Page extends Component {
  static displayName = "SuperCompanies"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired,
  }

  curCompany = {}

  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false,
      noDataText: 'No Companies'
    }

    this.state = {
      removePopupModal: false,
      redirectPath: '',
    }

    this.renderTableActions = this.renderTableActions.bind(this);
    this.renderTableStatus = this.renderTableStatus.bind(this);
    this.renderTableLicense = this.renderTableLicense.bind(this);
    this.redirectToPath = this.redirectToPath.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(companyListRequest({}))
  }



  renderUniqueId(cell, row, enumObject, index) {
    return (
      <div>{ index+1 }</div>
    )
  }

  renderTableActions(cell, row) {
    let viewPath = '/super/companies/' + row.id + '/view'
    let editPath = '/super/companies/' + row.id + '/edit'
    let settingsPath = '/super/companies/' + row.id + '/settings'

    return (
      <div>
        <Button size="sm" outline color="success" style={{marginRight: '10px'}} onClick={() => this.redirectToPath(viewPath)}><i className="icon-eye"></i> <Trans i18nKey="common.view"/></Button>
        <Button size="sm" outline color="primary" style={{marginRight: '10px'}} onClick={() => this.redirectToPath(editPath)}><i className="icon-pencil"></i> <Trans i18nKey="common.edit"/></Button>
        <Button size="sm" outline color="dark" style={{marginRight: '10px'}} onClick={() => this.redirectToPath(settingsPath)}><i className="icon-settings"></i> <Trans i18nKey="common.settings"/></Button>
        <Button size="sm" outline color="danger" onClick={()=> this.openRemovePopupModal(row)}><i className="icon-trash"></i> <Trans i18nKey="common.delete"/></Button>
      </div>
    )
  }

  renderTableStatus(cell, row) {
    return (
      <Label className="switch switch-3d switch-primary">
        <Input type="checkbox" className="switch-input" defaultChecked={ row.status === 'active' } onChange={() => this.onChangeStatus(row)}/>
        <span className="switch-label"></span>
        <span className="switch-handle"></span>
      </Label>
    )
  }

  renderTableLicense(cell, row) {
    if (_.isEmpty(row.licenseModel)) {
      return <div>
        <p>None</p>
      </div>
    } else {
      return <div>
        <p>{row.licenseModel.name}</p>
      </div>
    }
  }

  onChangeStatus(company) {
    const { dispatch } = this.props

    let params = {
      company_id: company.id,
      active: company.status === "active" ? "inactive" : "active",
    }
    dispatch(companyUpdateStatusRequest(params))
  }

  openRemovePopupModal(company) {
    this.curCompany = company;
    this.toggleRemovePopupModal();
  }

  toggleRemovePopupModal() {
    this.setState({
      removePopupModal: !this.state.removePopupModal
    })
  }

  removeCompany() {
    const { dispatch } = this.props

    this.toggleRemovePopupModal()
    dispatch(companyRemoveRequest(this.curCompany))
  }

  redirectToPath(path) {
    this.setState({
      redirectPath: path
    });
  }

  render() {
    let { companies } = this.props;

    if (this.state.redirectPath !== '') {
      return (<Redirect to={ this.state.redirectPath }/>);
    }

    return (<div className="animated">
      <Modal isOpen={ this.state.removePopupModal } toggle={this.toggleRemovePopupModal}
             className={'modal-danger'}>
        <ModalHeader toggle={this.toggleRemovePopupModal}><Trans i18nKey="common.warning"/></ModalHeader>
        <ModalBody>
          <Trans i18nKey="admin.company_remove_message"/>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() =>this.removeCompany()}><Trans i18nKey="common.ok"/></Button>{' '}
          <Button color="secondary" onClick={() =>this.toggleRemovePopupModal()}><Trans i18nKey="common.cancel"/></Button>
        </ModalFooter>
      </Modal>
      <Card>
        <CardHeader>
          <i className="icon-menu"></i><Trans i18nKey="admin.company_table"/>
        </CardHeader>
        <CardBody>
          <Button className="super-bootstrap-table-actions-but" color="primary" onClick={() => this.redirectToPath('/super/companies/add')}><i className="icon-plus"></i> <Trans i18nKey="admin.create_company"/></Button>
          <BootstrapTable data={ companies } version="4" striped hover pagination search options={ this.options }>
            <TableHeaderColumn isKey dataField="id" dataSort width="50">#</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort><Trans i18nKey="common.name"/></TableHeaderColumn>
            <TableHeaderColumn dataField="country" dataSort><Trans i18nKey="auth.country"/></TableHeaderColumn>
            <TableHeaderColumn dataField="email" dataSort width="200"><Trans i18nKey="common.email"/></TableHeaderColumn>
            <TableHeaderColumn dataField="License" dataFormat={this.renderTableLicense} dataSort><Trans i18nKey="admin.license_model"/></TableHeaderColumn>
            <TableHeaderColumn dataField="status" dataFormat={this.renderTableStatus.bind(this)} dataSort dataAlign="center" width="90"><Trans i18nKey="common.status"/></TableHeaderColumn>
            <TableHeaderColumn dataField="actions" dataFormat={this.renderTableActions} width="420"><Trans i18nKey="common.actions"/></TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>)
  }
}

export default withTranslation()(Page)
