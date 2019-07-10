// import libs
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import components
import { Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import NavItem from './NavItem'
import i18n from "../../i18n";

// define component name
const displayName = 'PrivateHeader'
import {Trans, withTranslation } from "react-i18next";

// validate properties
const propTypes = {
  user: PropTypes.object.isRequired,
  showNavigation: PropTypes.bool.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

// initiate comppnent
const PrivateHeader = ({ user, showNavigation, showDropdown, toggleDropdown, logout }) => (
  <Collapse className="navbar-collapse navbar-dark" isOpen={showNavigation}>
    {/*<ul className="navbar-nav mr-auto">*/}
      {/*<NavItem path="/">Home</NavItem>*/}
      {/*<NavItem path="/articles">Articles</NavItem>*/}
    {/*</ul>*/}

    {/*<ul className="navbar-nav">*/}
      {/*<Dropdown isOpen={showDropdown} toggle={toggleDropdown}>*/}
        {/*<DropdownToggle nav caret>*/}
          {/*{ user.name }*/}
        {/*</DropdownToggle>*/}
        {/*<DropdownMenu className="dropdown-menu-right">*/}
          {/*<Link className='dropdown-item' to={`/users/${user.id}/edit`}>*/}
            {/*<span className="fa fa-user-o" title="logout" aria-hidden="true"/> Profile*/}
          {/*</Link>*/}
          {/*<DropdownItem divider />*/}
          {/*<DropdownItem onClick={e => logout(e)}>*/}
            {/*<span className="fa fa-sign-out" title="logout" aria-hidden="true"/> Logout*/}
          {/*</DropdownItem>*/}
        {/*</DropdownMenu>*/}
      {/*</Dropdown>*/}
    {/*</ul>*/}

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
        {(() => {
            if(user.role == "admin"){
                return(<NavItem path="/super/dashboard"><Trans i18nKey="header.go_to_dashboard"/></NavItem>);
            } else {
                return(<NavItem path="/dashboard"><Trans i18nKey="header.go_to_dashboard"/></NavItem>);
            }

        })()}
    </ul>
  </Collapse>)

// bind properties
PrivateHeader.displayName = displayName
PrivateHeader.propTypes = propTypes

// export component

export default withTranslation()(PrivateHeader)
