import React from 'react'
import PropTypes from 'prop-types'

import {
    Row, Col,
    Card, CardBody,
    FormGroup, Button, Input, InputGroup, Label
} from 'reactstrap';
import { Trans , withTranslation} from 'react-i18next';

const displayName = 'UserAddFrom'
const propTypes = {
  // user: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  statusList : PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const Form = ({ credentials, statusList, errors, onChange, onSubmit, t }) => {
  function renderStatusList(data_value) {
      let statusLists = statusList.map((data_unit, unit_key) =>{
          return (
              <option value={ data_unit } key={ unit_key }>{ capitalize(data_unit) }</option>
          )
      })
      return (
          <Input className="float-right actions-select" type="select" value={data_value} name="status" onChange={e => onChange(e.target.name, e.target.value )}>
              { statusLists }
          </Input>
      )
  }

  function capitalize(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return <form className="user-form" onSubmit={e => onSubmit(e)}>
    <Card>
      <CardBody className="p-4">
        <h1><Trans i18nKey="users.add_user"/></h1>
        <FormGroup row>
          <Col md="3">
            <label htmlFor="name" className="col-form-label"><Trans i18nKey="common.name"/></label>
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
              {errors.has('passwordConfirmation') && <div className="invalid-feedback">{errors.first('passwordConfirmation')}</div>}
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
