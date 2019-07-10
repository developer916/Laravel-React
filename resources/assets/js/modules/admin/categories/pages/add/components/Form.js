import React from 'react'
import PropTypes from 'prop-types'
import {
    Col,
    Card, CardBody,
    Button,
    FormGroup,
    Input, InputGroup,
    Label
} from 'reactstrap';
import {Trans, withTranslation} from 'react-i18next';

const displayName = 'AddCategoryForm';
const propTypes = {
    errors: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Form = ({ category,  errors, onSubmit, onChange, t }) => {
    return <form className="user-form" onSubmit={e => onSubmit(e)} noValidate>
        <Card>
            <CardBody className="p-4">
                <h1 style={{marginBottom: 20}}><Trans i18nKey="admin.add_category"/></h1>
                <FormGroup row>
                    <Col md="12">
                        <label htmlFor="name" className="col-form-label"><Trans i18nKey="admin.category_name"/></label>
                    </Col>
                    <Col xs="12" md="12">
                        <Input type="text"
                               id="name"
                               name="name"
                               className={`form-control ${errors.has('name') && 'is-invalid'}`}
                               placeholder={t('admin.category_name')}
                               value={category.name || ''}
                               onChange={e => onChange(e.target.name, e.target.value)} />
                        {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
                    </Col>
                </FormGroup>
                <Button type="submit" color="primary" block style={{ width: 150, float: "right" }}><Trans i18nKey="common.save"/></Button>
            </CardBody>
        </Card>
    </form>
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default withTranslation()(Form)