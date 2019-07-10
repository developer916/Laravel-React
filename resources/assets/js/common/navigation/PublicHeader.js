// import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import { Collapse } from 'reactstrap'
import NavItem from './NavItem'
import {Trans, withTranslation } from "react-i18next";
import i18n from "../../i18n";
// define component name
const displayName = 'PublicHeader'

// validate properties
const propTypes = {
  showNavigation: PropTypes.bool.isRequired,
}

// initiate comppnent
const PublicHeader = ({ showNavigation }) => (
  <Collapse className="navbar-collapse navbar-dark" isOpen={showNavigation}>
    <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Trans i18nKey="header.language"/>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="javascript:void(0)" onClick={() =>  i18n.changeLanguage("en")}><Trans i18nKey="header.english"/></a>
                <a className="dropdown-item" href="javascript:void(0)" onClick={() => i18n.changeLanguage("gm")}><Trans i18nKey="header.german"/></a>
            </div>
        </li>

      <NavItem path="/login"><Trans i18nKey="header.login"/></NavItem>
      <NavItem path="/register"><Trans i18nKey="header.register"/></NavItem>
    </ul>
  </Collapse>)

// bind properties
PublicHeader.displayName = displayName
PublicHeader.propTypes = propTypes

// export component
// export default translate("translations")(PublicHeader);
export default withTranslation()(PublicHeader)
