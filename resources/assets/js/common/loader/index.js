import React from 'react'
import PropTypes from 'prop-types'

import {Container, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupButton} from 'reactstrap';

// set display name for component
const displayName = 'CommonLoader'

// validate component properties
const propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
}

const LoadingComponent = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <div>
        <div style={{ padding: '10px' }}>Loading now... </div>
        <div className="spinner-border" role="status"></div>
      </div>
      );
  }
  // Handle the error state
  else if (error) {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4">500</h1>
                <h4 className="pt-3">Houston, we have a problem!</h4>
                <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
              </span>
              <InputGroup className="input-prepend">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <Input size="16" type="text" placeholder="What are you looking for?" />
                <div className="input-group-append">
                  <Button color="info">Search</Button>
                </div>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  else {
    return null
  }
}

LoadingComponent.displayName = displayName
LoadingComponent.propTypes = propTypes

export default LoadingComponent