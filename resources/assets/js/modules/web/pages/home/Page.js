import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"

class Page extends Component {
  static displayName = "HomePage"

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return <Redirect to={{ pathname: "/login" }}/>
  }
}

export default Page
