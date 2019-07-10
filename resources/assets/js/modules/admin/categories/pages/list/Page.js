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

import { categoryListRequest, removeCategory } from '../../service';

import {Trans, withTranslation} from 'react-i18next';

class Page extends Component {
    static displayName = "SuperCategoriesPage"
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
    }

    curCategory = {}

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
            noDataText: 'No Categories'
        }

        this.state = {
            removePopupModal: false,
            redirectPath: '',
        };

        this.renderTableActions = this.renderTableActions.bind(this);
        this.redirectToPath = this.redirectToPath.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(categoryListRequest({}))
    }

    redirectToPath(path) {
        this.setState({
            redirectPath: path
        });
    }

    openRemovePopupModal(category) {
        this.curCategory = category;
        this.toggleRemovePopupModal();
    }

    toggleRemovePopupModal() {
        this.setState({
            removePopupModal: !this.state.removePopupModal
        })
    }

    removeCategory() {
        const { dispatch } = this.props

        this.toggleRemovePopupModal()
        dispatch(removeCategory(this.curCategory))
    }


    renderTableActions(cell, row) {
        let editPath = '/super/categories/' + row.id + '/edit'

        return (
            <div>
                <Button size="sm" outline color="primary" style={{marginRight: '10px'}} onClick={() => this.redirectToPath(editPath)}><i className="icon-pencil"></i> <Trans i18nKey="common.edit"/></Button>
                <Button size="sm" outline color="danger" onClick={()=> this.openRemovePopupModal(row)}><i className="icon-trash"></i> <Trans i18nKey="common.delete"/></Button>
            </div>
        )
    }



    render(){
        const { categories } = this.props;

        if (this.state.redirectPath !== '') {
            return (<Redirect to={ this.state.redirectPath }/>);
        }

        return (
            <div className="animated fadeIn">
                <Modal isOpen={ this.state.removePopupModal } toggle={this.toggleRemovePopupModal}
                       className={'modal-danger'}>
                    <ModalHeader toggle={this.toggleRemovePopupModal}><Trans i18nKey="common.warning"/></ModalHeader>
                    <ModalBody>
                        <Trans i18nKey="admin.category_remove_message"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() =>this.removeCategory()}><Trans i18nKey="common.ok"/></Button>{' '}
                        <Button color="secondary" onClick={() =>this.toggleRemovePopupModal()}><Trans i18nKey="common.cancel"/></Button>
                    </ModalFooter>
                </Modal>
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i><Trans i18nKey="admin.category_table"/>
                    </CardHeader>
                    <CardBody>
                        <Button className="super-bootstrap-table-actions-but" color="primary" onClick={() => this.redirectToPath('/super/categories/add')}><i className="icon-plus"></i> <Trans i18nKey="admin.create_category"/></Button>
                        <BootstrapTable data={ categories } version="4" striped hover pagination search options={ this.options }>
                            <TableHeaderColumn isKey dataField="id" dataSort width="50">#</TableHeaderColumn>
                            <TableHeaderColumn dataField="name" dataSort><Trans i18nKey="admin.category_name"/></TableHeaderColumn>
                            <TableHeaderColumn dataField="actions" dataFormat={this.renderTableActions} width="420"><Trans i18nKey="common.actions"/></TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        );
    }
}


export default withTranslation()(Page)
