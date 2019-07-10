import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import { Card, CardBody, Button, Input, InputGroup,FormGroup, Label} from 'reactstrap';
import { updatePassword } from '../../service'
import ReeValidate from 'ree-validate'
import {Trans, withTranslation} from 'react-i18next';

class Page extends Component {
    static displayName = "SuperAdminPassword"
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)

        this.validator = new ReeValidate({
            currentPassword: 'required|min:6',
            password: 'required|min:6',
            passwordConfirmation: 'required|min:6'
        })

        this.state = {
            credentials: {
                currentPassword: '',
                password: '',
                passwordConfirmation: '',
            },
            toBack : false,
            errors: this.validator.errors,
            fields: this.validator.fields
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    // event to handle input change
    handleChange(name, value) {
        const { errors } = this.validator

        this.setState({credentials: { ...this.state.credentials, [name]: value }})
        errors.remove(name)

        this.validator.validate(name, value)
            .then(() => {
                this.setState({ errors })
            })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { credentials } = this.state
        const { errors } = this.validator

        this.validator.validateAll(credentials)
            .then((success) => {
                if (success) {
                    this.submit(credentials)
                } else {
                    this.setState({ errors })
                }
            })
    }

    submit(credentials) {
        this.props.dispatch(updatePassword(credentials))
            .then(res => {
                if (res.status == 'success') {
                    this.setState({toBack: true});
                }
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator
                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                } else if (statusCode === 401) {
                    errors.add('password', error);
                }

                this.setState({ errors })
            })
    }

    render()
    {
        if(this.state.toBack){
            return (<Redirect to="/super/analytics"/>);
        }
        const {t} = this.props;


        return (
            <div className="update-password animated fadeIn">
                <form className="password-form" onSubmit={this.handleSubmit} noValidate>
                    <Card>
                        <CardBody className="p-4">
                            <h1><Trans i18nKey="admin.password_management"/></h1>
                            <FormGroup>
                                <Label><Trans i18nKey="settings.current_password"/> </Label>
                                <InputGroup className="mb-3">
                                    <Input type="password"
                                           name="currentPassword"
                                           className={`${this.state.errors.has('currentPassword') && 'is-invalid'}`}
                                           placeholder={t('settings.current_password')}
                                           value={this.state.credentials.currentPassword || ''}
                                           onChange={e => this.handleChange(e.target.name, e.target.value)}
                                           required
                                           autoFocus/>
                                    {this.state.errors.has('currentPassword') && <div className="invalid-feedback">{this.state.errors.first('currentPassword')}</div>}
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label><Trans i18nKey="settings.new_password"/></Label>
                                <InputGroup className="mb-3">
                                    <Input type="password"
                                           name="password"
                                           className={`${this.state.errors.has('password') && 'is-invalid'}`}
                                           placeholder={t('settings.new_password')}
                                           value={this.state.credentials.password || ''}
                                           onChange={e => this.handleChange(e.target.name, e.target.value)}
                                           required/>
                                    {this.state.errors.has('password') && <div className="invalid-feedback">{this.state.errors.first('password')}</div>}
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label><Trans i18nKey="settings.confirm_new_password"/></Label>
                                <InputGroup className="mb-3">
                                    <Input type="password"
                                           name="passwordConfirmation"
                                           className={`${this.state.errors.has('passwordConfirmation') && 'is-invalid'}`}
                                           placeholder={t('settings.confirm_new_password')}
                                           value={this.state.credentials.passwordConfirmation || ''}
                                           onChange={e => this.handleChange(e.target.name, e.target.value)}
                                           required/>
                                    {this.state.errors.has('passwordConfirmation') && <div className="invalid-feedback">{this.state.errors.first('passwordConfirmation')}</div>}
                                </InputGroup>
                            </FormGroup>


                            <Button color="primary" block style={{ width: 150, float: "right" }} ><Trans i18nKey="settings.store_password"/></Button>
                        </CardBody>
                    </Card>
                </form>
            </div>
        );
    }
}

export default withTranslation()(Page)
