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

import { subscriberListRequest, subscriberRemoveRequest } from '../../service'
import { Trans, withTranslation} from "react-i18next";

class Page extends Component {
  static displayName = 'Subscribers'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    subscribers: PropTypes.array.isRequired,
  }

  curSubscriber = {}

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
    this.removeSubscriber = this.removeSubscriber.bind(this)
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(subscriberListRequest())
  }

  redirectToPath(path) {
    this.setState({
      redirectPath: path
    })
  }

  openRemoveModal(license) {
    this.curSubscriber = license
    this.toggleRemovePopupModal()
  }

  toggleRemovePopupModal() {
    this.setState({
      removePopupModal: !this.state.removePopupModal
    })
  }

  removeSubscriber() {
    const { dispatch } = this.props

    this.toggleRemovePopupModal()
    dispatch(subscriberRemoveRequest(this.curSubscriber))
  }

  renderCalendar(cell, row) {
    return <div>
      {row.calendar.name}
    </div>
  }

  renderTableActions(cell, row) {
    let viewPath = '/subscribers/' + row.id + '/view'
    let editPath = '/subscribers/' + row.id + '/edit'

    return (
      <div>
        <Button size="sm" outline color="success" style={{marginRight: '10px'}} onClick={() => this.redirectToPath(viewPath)}><i className="icon-eye"></i> <Trans i18nKey="common.view"/></Button>
        <Button size="sm" outline color="primary" style={{marginRight: '10px'}} onClick={() => this.redirectToPath(editPath)}><i className="icon-pencil"></i> <Trans i18nKey="common.edit"/></Button>
        <Button size="sm" outline color="danger" onClick={() => this.openRemoveModal(row)}><i className="icon-trash"></i> <Trans i18nKey="common.delete"/></Button>
      </div>
    )
  }

  render() {
    const {subscribers} = this.props

    if (this.state.redirectPath !== '') {
      return (<Redirect to={ this.state.redirectPath }/>);
    }

    return <div className="animated fadeIn">
      <Modal isOpen={ this.state.removePopupModal } toggle={this.toggleRemovePopupModal}
             className={'modal-danger'}>
        <ModalHeader toggle={this.toggleRemovePopupModal}><Trans i18nKey="common.warning"/></ModalHeader>
        <ModalBody>
          <Trans i18nKey="subscribers.subscribe_delete_message"/>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() =>this.removeSubscriber()}><Trans i18nKey="common.ok"/></Button>{' '}
          <Button color="secondary" onClick={() =>this.toggleRemovePopupModal()}><Trans i18nKey="common.cancel"/></Button>
        </ModalFooter>
      </Modal>
      <Card>
        <CardHeader>
          <i className="icon-menu"></i><Trans i18nKey="subscribers.subscribers_table"/>
        </CardHeader>
        <CardBody>
          <BootstrapTable data={subscribers} version="4" striped hover pagination search options={ this.options }>
            <TableHeaderColumn isKey dataField="id" dataSort width="60">#</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort><Trans i18nKey="common.name"/></TableHeaderColumn>
            <TableHeaderColumn dataField="email" dataSort><Trans i18nKey="common.email"/></TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataSort width="200">Description</TableHeaderColumn>
            <TableHeaderColumn dataField="calendarName" dataFormat={this.renderCalendar} dataSort width="200"><Trans i18nKey="common.calendar"/></TableHeaderColumn>
            <TableHeaderColumn dataField="updatedAt" dataSort width="150"><Trans i18nKey="subscribers.subscribe_at"/></TableHeaderColumn>
            <TableHeaderColumn dataField="actions" dataFormat={this.renderTableActions} width="230"><Trans i18nKey="common.actions"/></TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  }
}

export default withTranslation()(Page)
