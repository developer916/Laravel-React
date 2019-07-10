import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Card, CardBody, Button, Input, InputGroup } from 'reactstrap';

const displayName = 'AddressFrom'

const propTypes = {
  name: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  taxId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const Form = ({ name, street, postalCode, city, country, phone, email, website, taxId, errors, handleChange, handleSubmit }) => {
  return (<form className="address-form" onSubmit={handleSubmit} noValidate>
    <Card className="mx-4">
      <CardBody className="p-4">
        <h1>Address of Company</h1>
        <p className="text-muted">Fill out the information of Your Company</p>
        <InputGroup className="mb-3">
          <Input type="text"
                 name="name"
                 className={`${errors.has('name') && 'is-invalid'}`}
                 placeholder="Name of Company *"
                 value={name || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required
                 autoFocus/>
          {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="text"
                 name="street"
                 className={`${errors.has('street') && 'is-invalid'}`}
                 placeholder="Street Name and Number *"
                 value={street || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required/>
          {errors.has('street') && <div className="invalid-feedback">{errors.first('street')}</div>}
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="text"
                 name="postalCode"
                 className={`${errors.has('postalCode') && 'is-invalid'}`}
                 placeholder="Postal Code *"
                 value={postalCode || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required/>
          {errors.has('postalCode') && <div className="invalid-feedback">{errors.first('postalCode')}</div>}
        </InputGroup>
        <InputGroup className="mb-4">
          <Input type="text"
                 name="city"
                 className={`${errors.has('city') && 'is-invalid'}`}
                 placeholder="City *"
                 value={city || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required/>
          {errors.has('city') && <div className="invalid-feedback">{errors.first('city')}</div>}
        </InputGroup>
        <InputGroup className="mb-4">
          <Input type="text"
                 name="country"
                 className={`${errors.has('country') && 'is-invalid'}`}
                 placeholder="Country"
                 value={country || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required/>
          {errors.has('country') && <div className="invalid-feedback">{errors.first('country')}</div>}
        </InputGroup>
        <InputGroup className="mb-4">
          <Input type="text"
                 name="phone"
                 className={`${errors.has('phone') && 'is-invalid'}`}
                 placeholder="Phone Number *"
                 value={phone || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}
                 required/>
          {errors.has('phone') && <div className="invalid-feedback">{errors.first('phone')}</div>}
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="email"
                 name="email"
                 className={`${errors.has('email') && 'is-invalid'}`}
                 placeholder="Email"
                 value={email || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}/>
          {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
        </InputGroup>
        <InputGroup className="mb-4">
          <Input type="text"
                 name="website"
                 className={`${errors.has('website') && 'is-invalid'}`}
                 placeholder="Website URL"
                 value={website || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}/>
          {errors.has('website') && <div className="invalid-feedback">{errors.first('website')}</div>}
        </InputGroup>
        <InputGroup className="mb-4">
          <Input type="text"
                 name="taxId"
                 className={`${errors.has('taxId') && 'is-invalid'}`}
                 placeholder="Tax Id"
                 value={taxId || ''}
                 onChange={e => handleChange(e.target.name, e.target.value)}/>
          {errors.has('taxId') && <div className="invalid-feedback">{errors.first('taxId')}</div>}
        </InputGroup>
        <Button color="success" block>Store Information</Button>
      </CardBody>
    </Card>
  </form>)
}

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
