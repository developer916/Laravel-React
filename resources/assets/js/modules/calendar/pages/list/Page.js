import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from 'react-redux'
import {Trans, withTranslation} from "react-i18next";
import _ from 'lodash'

import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Redirect} from 'react-router-dom'

import {list, deleteCalendar} from "../../service"
import * as calendarActions from '../../store/actions';

class Page extends Component {
  static displayName = "CalendarsPage";

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    calendarList: PropTypes.array.isRequired,
    role: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.tableData = [
      {
        'no': 1,
        'name': 'Calendar 1',
        'description': 'calendar description',
        'background_url': 'img/calendar_backgrounds/calendar1.jpeg'
      },
      {
        'no': 2,
        'name': 'Calendar 2',
        'description': 'calendar description',
        'background_url': 'img/calendar_backgrounds/calendar1.jpeg'
      }
    ];

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    };

    this.state = {
      radioSelected: 2,
      toNewCalendar: false,
      calendarList: props.calendarList,
      showDangerModal: false,
      selectedCalendar: {},
      toEditCalendar: false,
      toViewCalendar: false,
      redirectPath: ''
    };
  }

  componentDidMount() {
    if (this.props.calendarList.length === 0) {
      this.props.dispatch(list())
        .then(res => {
          this.setState({calendarList: res.calendars});
        }).catch(err => {
          console.log(err);
        });
    }
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  buttonFormatter(cell, row) {
    if(this.props.role === 'company'){
      return (
        <div>
          <Button size="sm" color="secondary" style={{marginRight: '10px'}} onClick={() => this.codeCalendar(row)}><i className="fa fa-code"></i> <Trans i18nKey="common.code"/></Button>
          <Button size="sm" color="success" style={{marginRight: '10px'}} onClick={() => this.viewCalendar(row)}><i className="icon-eye"></i> <Trans i18nKey="common.view"/></Button>
          <Button size="sm" color="primary" style={{marginRight: '10px'}} onClick={() => this.editCalendar(row)}><i className="icon-pencil"></i> <Trans i18nKey="common.edit"/></Button>
          <Button size="sm" color="danger" onClick={() => this.openDangerModal(row)}><i className="icon-trash"></i> <Trans i18nKey="common.delete"/></Button>
        </div>
      )
    } else {
      return (
        <div>
          <Button size="sm" color="success" style={{marginRight: '10px'}} onClick={() => this.viewCalendar(row)}><i className="icon-eye"></i> <Trans i18nKey="common.view"/></Button>
        </div>
      );
    }

  }

  indexN(cell, row, enumObject, index) {
    return (<div>{index+1}</div>)
  }

  codeCalendar(calendar) {
    let path = "/calendars/" + calendar.id + "/subscription-generator"

    this.setState({
      redirectPath: path
    })
  }

  editCalendar(calendar) {
    let path = "/calendars/" + calendar.id + "/edit";
    // this.setState({toEditCalendar: true});
    this.setState({
        redirectPath: path
    });
  }

  viewCalendar(calendar) {
    this.props.dispatch(calendarActions.setCurrentCalendar(calendar));
    let path = "/calendars/" + calendar.id + "/view";
    this.setState({
        redirectPath: path
    });

    // this.setState({toViewCalendar: true});
  }

  deleteCalendar() {
    let calendar = this.state.selectedCalendar;
    this.props.dispatch(deleteCalendar(calendar))
      .then(res => {
        this.setState({calendarList: this.props.calendarList});
        this.openDangerModal({});
      }).catch(err => {
        console.log(err);
      });
  }

  openDangerModal(calendar = {}) {
    this.setState({
      showDangerModal: !this.state.showDangerModal,
      selectedCalendar: calendar
    });
  }

  renderList() {
    if (this.state.radioSelected === 1) {
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
          <BootstrapTable data={this.state.calendarList} version="4" striped hover pagination search options={this.options}>
            <TableHeaderColumn dataField="any" dataFormat={this.indexN}>#</TableHeaderColumn>
            <TableHeaderColumn isKey dataField="name" dataSort><Trans i18nKey="common.name"/></TableHeaderColumn>
            <TableHeaderColumn dataField="description"><Trans i18nKey="common.description"/></TableHeaderColumn>
            <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}><Trans i18nKey="common.actions"/></TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    } else {
      let cardItems = this.state.calendarList.map(data => {
        return (
          <Col sm="4" key={data.id}>
            <Card>
              <CardBody
                style={{backgroundImage: `url(uploads/${data.picture})`, height: '130px', backgroundSize: 'cover'}}>
                <CardTitle>{data.name}</CardTitle>
                <div className="small">{data.description}</div>
              </CardBody>
              <CardFooter>
                  { this.renderButtonGroup(data) }
              </CardFooter>
            </Card>
          </Col>
        )
      });
      return (
        <div style={{marginTop: '20px'}}>
          <Row>
            {cardItems}
          </Row>
        </div>
      );
    }
  }

  renderButtonGroup(data) {
    if(this.props.role == 'company'){
      return (
          <ButtonGroup style={{width: '100%'}}>
            <Button color="light" block onClick={() => this.codeCalendar(data)} style={{marginTop: 0}}><i className="fa fa-code fa-lg"></i> <Trans i18nKey="common.code"/></Button>
            <Button color="light" block onClick={() => this.viewCalendar(data)} style={{marginTop: 0}}><i className="icon-eye"></i> <Trans i18nKey="common.view"/></Button>
            <Button color="light" block onClick={() => this.editCalendar(data)} style={{marginTop: 0}}><i className="icon-pencil"></i> <Trans i18nKey="common.edit"/></Button>
            <Button color="light" block onClick={() => this.openDangerModal(data)} style={{marginTop: 0}}><i className="icon-trash"></i> <Trans i18nKey="common.delete"/></Button>
          </ButtonGroup>
      );
    } else {
      return (
          <ButtonGroup style={{width: '100%'}}>
            <Button color="light" block onClick={() => this.viewCalendar(data)} style={{marginTop: 0}}><i className="icon-eye"></i> <Trans i18nKey="common.view"/></Button>
          </ButtonGroup>
      );

    }
  }

  renderAddButton() {
    if (this.props.role == 'company') {
      return (
        <Button color="primary" className="float-right" onClick={() => this.setState({toNewCalendar: true})}>
          <i className="icon-plus"></i> <Trans i18nKey="calendars.add_new_calendar"/>
        </Button>
      );
    }
  }

  render() {
    if (!_.isEmpty(this.state.redirectPath)) {
      return <Redirect to={this.state.redirectPath} />
    }
    if (this.state.toNewCalendar) {
      return <Redirect to='/calendars/new' />
    }
    if (this.state.toEditCalendar) {
      return <Redirect to='/calendars/edit'/>
    }
    if (this.state.toViewCalendar) {
      return <Redirect to='/calendars/view'/>
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Modal isOpen={this.state.showDangerModal} toggle={() => this.openDangerModal()}
                       className={'modal-danger'}>
                  <ModalHeader toggle={() => this.openDangerModal()}><Trans i18nKey="common.warning"/></ModalHeader>
                  <ModalBody>
                    <Trans i18nKey="calendars.delete_message"/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={() => this.deleteCalendar()}><Trans i18nKey="common.ok"/></Button>{' '}
                    <Button color="secondary" onClick={() => this.openDangerModal()}><Trans i18nKey="common.cancel"/></Button>
                  </ModalFooter>
                </Modal>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0"><Trans i18nKey="calendars.calendars"/></CardTitle>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    {this.renderAddButton()}
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)}
                                active={this.state.radioSelected === 1}><i className="icon-list"></i></Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)}
                                active={this.state.radioSelected === 2}><i className="icon-grid"></i></Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                {this.renderList()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    role: state.auth.role,
    calendarList: state.calendar.calendarList
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Page))
