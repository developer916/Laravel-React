import React from 'react'
import PropTypes from 'prop-types'

import {
    Row, Col,
    Card, CardBody,
    FormGroup, Button, Input, InputGroup, Label
} from 'reactstrap';
import {Trans , withTranslation} from'react-i18next';

const displayName = 'UserFrom'
const propTypes = {
  user: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  statusList : PropTypes.array.isRequired,
  roleList : PropTypes.array.isRequired,
  companies : PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  checkPasswordChange: PropTypes.func.isRequired
}

const Form = ({ user, credentials, statusList, companies, roleList, checkPassword,  errors, onChange, onSubmit, checkPasswordChange , t }) => {

    function renderStatusList(data_value) {
        let statusLists = statusList.map((data_unit, unit_key) =>{
            return (
                <option value={ data_unit } key={ unit_key }>{ capitalize(data_unit) }</option>
            )
        })
        return (
            <Input className="float-right actions-select" type="select" value={data_value} name="status" onChange={e => onChange(e.target.name, e.target.value)}>
                { statusLists }
            </Input>
        )
    }

    function renderRoleList(data_value){
        let roleLists = roleList.map((data_role, role_key) =>{
            return (
                <option value={ data_role } key={ role_key }>{ capitalize(data_role) }</option>
            )
        })

        return (
            <Input className="float-right actions-select" type="select" value={data_value} name="role" onChange={e => onChange(e.target.name, e.target.value )}>
                { roleLists }
            </Input>
        )
    }

    function renderCompanyList(data_value){
        let companyLists = companies.map((data_company, company_key) => {
            return(
                <option value={data_company.id} key={company_key} > {data_company.name} </option>
            );
        });

        return (
            <div>
                <Input className={`float-right actions-select ${errors.has('companyId') && 'is-invalid'}`}  type="select"  name="companyId" value={data_value} onChange={e => onChange(e.target.name, e.target.value )}>
                    { companyLists }
                </Input>
                {(() => {
                    if(errors.has('companyId')){
                        return(
                            <div className="invalid-feedback">{ errors.first('companyId') }</div>
                        );
                    }
                })()}
            </div>
        )
    }

    function capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return <form className="user-form" onSubmit={e => onSubmit(e)}>
      <Card>
        <CardBody className="p-4">
          <h1 style={{marginBottom: 20}}><Trans i18nKey="users.edit_user"/></h1>
          <FormGroup row>
            <Col md="3">
                <Trans i18nKey="users.company"/>
            </Col>
            <Col xs="12" md="9">
                {renderCompanyList(credentials.companyId)}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <label htmlFor="name" className="col-form-label"> <Trans i18nKey="common.name"/></label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text"
                     id="name"
                     name="name"
                     className={`form-control ${errors.has('name') && 'is-invalid'}`}
                     placeholder={t('common.name')}
                     value={credentials.name || ''}
                     onChange={e => onChange(e.target.name, e.target.value)} />
                {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <label htmlFor="email" className="col-form-label"><Trans i18nKey="common.email"/></label>
            </Col>
            <Col xs="12" md="9">
              <Input type="email"
                     id="email"
                     name="email"
                     className={`form-control ${errors.has('email') && 'is-invalid'}`}
                     placeholder={t('common.email')}
                     value={credentials.email || ''}
                     onChange={e => onChange(e.target.name, e.target.value)}/>
                {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
            </Col>
          </FormGroup>
            <FormGroup check className="checkbox form-group" >
                <Col xs="12" md={{ size: 9, offset: 3 }}>
                    <Input className="form-check-input"
                           type="checkbox"
                           name="checkPassword"
                           value={1}
                           onChange={e => checkPasswordChange(e.target.value)}
                           checked={checkPassword === true}/>
                    <Label className="form-check-label" check htmlFor="status"><Trans i18nKey="users.do_you_want_to_change_password"/></Label>
                </Col>
            </FormGroup>
            {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                    {/*<label htmlFor="want-to-change" className="col-form-label">Do you want to change password?</label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                    {/*<Input type="" />*/}
                {/*</Col>*/}
            {/*</FormGroup>*/}

            {(() => {
                if(checkPassword == 1){
                    return (
                        <FormGroup row>
                            <Col md="3">
                                <label htmlFor="password" className="col-form-label"><Trans i18nKey="common.password"/></label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="password"
                                       id="password"
                                       name="password"
                                       className={`form-control ${errors.has('password') && 'is-invalid'}`}
                                       placeholder={t('common.password')}
                                       value={credentials.password || ''}
                                       onChange={e => onChange(e.target.name, e.target.value)}/>
                                {errors.has('password') && <div className="invalid-feedback">{errors.first('password')}</div>}
                            </Col>
                        </FormGroup>
                    );
                }
            })()}
            {(() => {
                if(checkPassword == 1) {
                    return (
                        <FormGroup row>
                            <Col md="3">
                                <label htmlFor="passwordConfirmation" className="col-form-label"><Trans i18nKey="common.confirm_password"/></label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="password"
                                       id="passwordConfirmation"
                                       name="passwordConfirmation"
                                       className={`form-control ${errors.has('passwordConfirmation') && 'is-invalid'}`}
                                       placeholder={t('common.confirm_password')}
                                       value={credentials.passwordConfirmation || ''}
                                       onChange={e => onChange(e.target.name, e.target.value)}/>
                                {errors.has('passwordConfirmation') &&
                                <div className="invalid-feedback">{errors.first('passwordConfirmation')}</div>}
                            </Col>
                        </FormGroup>
                    )
                }

             })()}



          <FormGroup row>
            <Col md="3"><Trans i18nKey="common.role"/></Col>
            <Col xs="12" md="9">
                { renderRoleList(credentials.role) }
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
                <Trans i18nKey="common.active"/>
            </Col>
            <Col xs="12" md="9">
                {renderStatusList(credentials.status)}
            </Col>
          </FormGroup>
          <Button type="submit" color="primary" block style={{ width: 150, float: "right" }}><Trans i18nKey="common.save"/></Button>

        </CardBody>
      </Card>
    </form>
}

Form.displayName = displayName
Form.propTypes = propTypes

export default withTranslation()(Form)
