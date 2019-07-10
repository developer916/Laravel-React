import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input, InputGroup, FormGroup, Col } from 'reactstrap';
import {Trans, withTranslation } from 'react-i18next';
import Select from 'react-select';
const displayName = 'Search Calendar';
const propTypes = {
  search: PropTypes.string,
  // errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

// multiple search
// const SearchForm = ({ search, errors, handleSubmit, handleChange }) => (
// in Input tag
// className={`${errors.has('name') && 'is-invalid'}`}
const SearchForm = ({ categories, search, handleSubmit, handleChange, t, handleMultiSelectChange}) => (
  <form onSubmit={handleSubmit} noValidate>
    <FormGroup row>
      <Col md={6}>
        <Select
            isMulti
            name="categories"
            options={categories}
            placeholder={t('common.category')}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiSelectChange}
        />
      </Col>
      <Col md={6}>
        <div className="controls">
          <InputGroup>
            <Input size="16"
                   type="text"
                   name="search"
                   id="search"
                   placeholder={t('home.search_front')}
                   value={search || ''}
                   onChange={e => handleChange(e.target.name, e.target.value)}
                   required/>
            <div className="input-group-append">
              <Button type="submit" color="primary">{t('home.search')}</Button>
            </div>
          </InputGroup>
        </div>
      </Col>
    </FormGroup>
  </form>
);

SearchForm.displayName = displayName;
SearchForm.propTypes = propTypes;

export default withTranslation()(SearchForm)
