import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import {
  Button,
  Card, CardHeader, CardBody,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import {
  BootstrapTable, TableHeaderColumn
} from 'react-bootstrap-table';

import {Trans, withTranslation} from 'react-i18next';
import { licenseListRequest, licenseRemoveRequest } from '../../service'

class Page extends Component {
  static displayName = 'SuperLicenses'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    licenses: PropTypes.array.isRequired,
  }

  curLicense = {}

  constructor(props) {
    super(props)

    this.state = {
      removePopupModal: false,
      redirectPath: '',
    }

    this.renderTableActions = this.renderTableActions.bind(this)
    this.redirectToPath = this.redirectToPath.bind(this)
    this.openRemoveModal = this.openRemoveModal.bind(this)
    this.toggleRemovePopupModal = this.toggleRemovePopupModal.bind(this)
    this.removeLicense = this.removeLicense.bind(this)
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(licenseListRequest())
  }

  redirectToPath(path) {
    this.setState({
      redirectPath: path
    })
  }

  openRemoveModal(license) {
    this.curLicense = license
    this.toggleRemovePopupModal()
  }

  toggleRemovePopupModal() {
    this.setState({
      removePopupModal: !this.state.removePopupModal
    })
  }

  removeLicense() {
    const { dispatch } = this.props

    this.toggleRemovePopupModal()
    dispatch(licenseRemoveRequest(this.curLicense))
  }

  renderTableActions(cell, row) {
    let viewPath = '/super/licenses/' + row.id + '/view'
    let editPath = '/super/licenses/' + row.id + '/edit'

    return (
      <div>
        <Button size="sm" outline color="success" style={{marginRight: '10px'}} onClick={() => this.redirectToPath(viewPath)}><i className="icon-eye"></i> <Trans i18nKey="common.view"/></Button>
        <Button size="sm" outline color="primary" style={{marginRight: '10px'}} onClick={() => this.redirectToPath(editPath)}><i className="icon-pencil"></i> <Trans i18nKey="common.edit"/></Button>
        <Button size="sm" outline color="danger" onClick={() => this.openRemoveModal(row)}><i className="icon-trash"></i> <Trans i18nKey="common.delete"/></Button>
      </div>
    )
  }

  render() {
    const {licenses} = this.props

    if (this.state.redirectPath !== '') {
      return (<Redirect to={ this.state.redirectPath }/>);
    }

    return <div className="animated fadeIn">
      <Modal isOpen={ this.state.removePopupModal } toggle={this.toggleRemovePopupModal}
             className={'modal-danger'}>
        <ModalHeader toggle={this.toggleRemovePopupModal}><Trans i18nKey="common.warning"/></ModalHeader>
        <ModalBody>
          <Trans i18nKey="admin.license_remove_message"/>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() =>this.removeLicense()}><Trans i18nKey="common.ok"/></Button>{' '}
          <Button color="secondary" onClick={() =>this.toggleRemovePopupModal()}><Trans i18nKey="common.cancel"/></Button>
        </ModalFooter>
      </Modal>
      <Card>
        <CardHeader>
          <i className="icon-menu"></i><Trans i18nKey="admin.license_table"/>
        </CardHeader>
        <CardBody>
          <Button className="super-bootstrap-table-actions-but" color="primary" onClick={() => this.redirectToPath('/super/licenses/add')}><i className="icon-plus"></i> <Trans i18nKey="admin.create_license"/></Button>
          <BootstrapTable data={licenses} version="4" striped hover pagination search options={ this.options }>
            <TableHeaderColumn isKey dataField="id" dataSort width="60">#</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort><Trans i18nKey="common.name"/></TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataSort><Trans i18nKey="common.description"/></TableHeaderColumn>
            <TableHeaderColumn dataField="price" dataSort width="75"><Trans i18nKey="admin.price"/></TableHeaderColumn>
            <TableHeaderColumn dataField="numberOfCalendars" dataSort width="180"><Trans i18nKey="admin.number_of_calendars"/></TableHeaderColumn>
            <TableHeaderColumn dataField="numberOfEvents" dataSort width="160"><Trans i18nKey="admin.number_of_events"/></TableHeaderColumn>
            <TableHeaderColumn dataField="numberOfSubscribers" dataSort width="200"><Trans i18nKey="admin.number_of_subscribers"/></TableHeaderColumn>
            <TableHeaderColumn dataField="actions" dataFormat={this.renderTableActions} width="230"><Trans i18nKey="common.actions"/></TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  }
}

export default withTranslation()(Page)
