import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import {
    Row, Col,FormGroup,
    InputGroup, Input, Button,
    Card, CardBody, CardTitle, CardFooter,
    TabContent, TabPane,
    Nav, NavItem, NavLink,Label,
    Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

import {Trans, withTranslation} from 'react-i18next';
import { updateMaintenance, getMaintenance } from '../../service'

class Page extends Component {
    static displayName = "SuperAdminMaintenance"
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.confirmValue = 'false';

        this.state = {
            confirm : this.props.maintenance,
            toBack : false,
            showDangerModal : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getMaintenance());
    }

    componentWillReceiveProps(nextProps){
        const maintenance = nextProps.maintenance
        if (!_.isEqual(this.state.confirm, maintenance)) {
            this.setState({ confirm : maintenance })
        }
    }
    handleChange(name, value) {
        if(this.state.confirm  != value){
            this.setState({showDangerModal : true});
            this.confirmValue = value;
        }
    }

    openDangerModal (){
        this.setState({ showDangerModal : false});
    };

    handleSubmit(){

        this.props.dispatch(updateMaintenance(this.confirmValue))
        .then(res => {
            if(res.status == 'success'){
                this.setState({confirm : this.confirmValue});
            }
        })
        .catch(({ error, statusCode }) => {
            window.alert("Your internet has some problems.");
        })

        this.openDangerModal();


    };


    render() {
        if (this.state.toBack) {
            return (<Redirect to="/super/analytics"/>);
        }


        return (
            <div className="update-maintenance animated fadeIn">
                <Modal isOpen={this.state.showDangerModal} toggle={() => this.openDangerModal()}
                       className={'modal-danger'}>
                    <ModalHeader toggle={() => this.openDangerModal()}><Trans i18nKey="common.warning"/></ModalHeader>
                    <ModalBody>
                        <Trans i18nKey="admin.maintenance_confirm_message"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.handleSubmit()}><Trans i18nKey="common.yes"/></Button>{' '}
                        <Button color="secondary" onClick={() => this.openDangerModal()}><Trans i18nKey="common.cancel"/></Button>
                    </ModalFooter>
                </Modal>
                <Card>
                    <CardBody className="p-4">
                        <h1><Trans i18nKey="admin.maintenance_management"/></h1>

                        <FormGroup row style={{marginTop: 20}}>
                            <Col md="3">
                                <FormGroup check inline>
                                    <Input className="form-check-input"
                                           type="checkbox"
                                           id="inline-checkbox1"
                                           name="confirm"
                                           value="true"
                                           onChange={e => this.handleChange(e.target.name, e.target.value)}
                                           checked={this.state.confirm === "true"}/>
                                    <Label className="form-check-label" check htmlFor="inline-checkbox1"><Trans i18nKey="common.yes"/></Label>
                                </FormGroup>

                                <FormGroup check inline>
                                    <Input className="form-check-input"
                                           type="checkbox"
                                           id="inline-checkbox2"
                                           name="confirm"
                                           value="false"
                                           onChange={e => this.handleChange(e.target.name, e.target.value)}
                                           checked={this.state.confirm === "false"}/>
                                    <Label className="form-check-label" check htmlFor="inline-checkbox2"><Trans i18nKey="common.no"/></Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withTranslation()(Page)