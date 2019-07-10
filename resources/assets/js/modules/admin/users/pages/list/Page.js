import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {
  Row, Col,
  InputGroup, Input, Button,
  Card, CardBody, CardTitle, CardFooter,
  TabContent, TabPane,
  Nav, NavItem, NavLink,Label,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import classnames from 'classnames';
import { getUsers , deleteUser, updateUserStatus} from '../../service';
import _ from 'lodash'
let hasOwnProperty = Object.prototype.hasOwnProperty;
import {Trans, withTranslation} from 'react-i18next';

class Page extends Component {
  static displayName = "UserDashboard"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    companyId: PropTypes.any.isRequired,
  }

  curUser = {}

  constructor(props) {
    super(props);

      this.state = {
        radioSelected: 2,
        toNewCalendar: false,
        userList: this.props.users,
        showDangerModal: false,
        selectedCalendar: {},
        toEditCalendar: false,
        toViewCalendar: false,
        redirectPath: '',
        currentUser: {}
      };
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }
  componentDidMount() {

    const {dispatch } = this.props;

    dispatch(getUsers());

  }

  componentWillReceiveProps(nextProps){
    const userList = nextProps.users
      if (!_.isEqual(this.state.userList, userList)) {
          this.setState({ userList })
      }
  }
  editUser(user){
      let path = "/super/users/" + user.id + "/edit"

      this.setState({
          redirectPath: path
      })
  }


  openRemovePopupModal(user){
      this.curUser = user;
      this.openDangerModal();
  }

  openDangerModal() {
    this.setState({
      showDangerModal: !this.state.showDangerModal,
    });
  }

  removeUser(){
      const { dispatch } = this.props
      let removeUser = {
          id : this.curUser.id
      }
      dispatch(deleteUser(removeUser))
      .then(res => {
          this.setState({userList: this.props.users});
          this.openDangerModal({});
      })
      .catch(({ error, statusCode }) => {
          const { errors } = this.validator

          if (statusCode === 422) {
              _.forOwn(error, (message, field) => {
                  errors.add(field, message);
              });
          }

          this.setState({ errors })
      })

  }

  onChangeStatus(user) {
        const { dispatch } = this.props

        let params = {
            id: user.id,
            status: user.status === "active" ? "inactive" : "active",
        }
        dispatch(updateUserStatus(params))
  }

  redirectToPath(path){
      this.setState({
          redirectPath: path
      })
  }
  renderList() {
      this.css = `.react-bs-table-tool-bar .col-xs-6.col-sm-6.col-md-6.col-lg-8 {
        display: none;
      }
      .react-bs-table-search-form input {
        height: 35px !important;
      }`;
      return (
          <div style={{marginTop: '20px'}}>
            <style>
                {this.css}
            </style>
            <BootstrapTable data={this.state.userList} version="4" striped hover pagination search options={this.options}>
              <TableHeaderColumn dataField="any" dataFormat={this.indexN}>#</TableHeaderColumn>
              <TableHeaderColumn isKey dataField="name" dataSort><Trans i18nKey="common.name"/></TableHeaderColumn>
              <TableHeaderColumn dataField="email" dataSort><Trans i18nKey="common.email"/></TableHeaderColumn>
              <TableHeaderColumn dataField="role" dataSort><Trans i18nKey="common.role"/></TableHeaderColumn>
              {/*<TableHeaderColumn dataField="role">Role</TableHeaderColumn>*/}
              <TableHeaderColumn dataField="status" dataFormat={this.renderTableStatus.bind(this)} dataAlign="center" width="90"><Trans i18nKey="common.status"/></TableHeaderColumn>
              <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}><Trans i18nKey="common.actions"/></TableHeaderColumn>
            </BootstrapTable>
          </div>
      );
  }
  indexN(cell, row, enumObject, index) {
        return (<div>{index+1}</div>)
  }

  buttonFormatter(cell, row) {
    return (
        <div>
            <Button size="sm" color="primary" style={{marginRight: '10px'}} onClick={() => this.editUser(row)}><i className="icon-pencil"></i> <Trans i18nKey="common.edit"/></Button>
            <Button size="sm" color="danger" onClick={() => this.openRemovePopupModal(row)}><i className="icon-trash"></i> <Trans i18nKey="common.delete"/></Button>
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
  renderAddButton() {
    if (this.props.role == 'admin') {
      return (
        <Button color="primary" className="float-right" onClick={() => this.redirectToPath('/super/users/add')}>
            <i className="icon-plus"></i> <Trans i18nKey="users.add_new_user"/>
        </Button>
      );
    }
  }
  render() {
    if(this.props.role == "user"){
        return (<Redirect to="/calendars"/>);
    }
    if(this.state.redirectPath != ""){
        return (<Redirect to={ this.state.redirectPath }/>);
    }

    return (
      <div className="animated fadeIn">
      <Modal isOpen={this.state.showDangerModal} toggle={() => this.openDangerModal()}
             className={'modal-danger'}>
          <ModalHeader toggle={() => this.openDangerModal()}><Trans i18nKey="common.warning"/></ModalHeader>
          <ModalBody>
              <Trans i18nKey="users.delete_user_message"/>
          </ModalBody>
          <ModalFooter>
              <Button color="danger" onClick={() => this.removeUser()}><Trans i18nKey="common.ok"/></Button>{' '}
              <Button color="secondary" onClick={() => this.openDangerModal()}><Trans i18nKey="common.cancel"/></Button>
          </ModalFooter>
      </Modal>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0"><Trans i18nKey="users.users"/></CardTitle>
                  </Col>
                   <Col sm="7" className="d-none d-sm-inline-block">
                     {this.renderAddButton()}
                  </Col>
                </Row>
                {this.renderList()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>)
  }
}

export default withTranslation()(Page)