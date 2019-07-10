//import libs
import React from 'react'
import PropTypes from 'prop-types'

import {Container} from 'reactstrap';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar/Sidebar';
import Breadcrumb from '../common/Breadcrumb/';
import Aside from '../common/Aside/';
import Footer from '../common/Footer/';

const displayName = 'User Layout'
const propTypes = {
  license: PropTypes.object,
  children: PropTypes.node.isRequired,
}

function UserLayout({ license, children , role}) {
  // return <div style={containerStyle}>
  //   <Navigation/>
  //   <main style={{ minHeight: '100vh'}}>
  //     { children }
  //     <ScrollTop />
  //   </main>
  //   <Footer/>
  // </div>
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar license={license} role={role}/>
        <main className="main">
          <Breadcrumb />
          <Container fluid>
            {children}
          </Container>
        </main>
        <Aside />
      </div>
      <Footer />
    </div>
  )
}

UserLayout.dispatch = displayName
UserLayout.propTypes = propTypes

export default UserLayout
