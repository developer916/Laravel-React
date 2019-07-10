//import libs
import React from 'react'
import PropTypes from 'prop-types'

import {Container} from 'reactstrap';
import Header from '../common/Header';
import SuperSidebar from '../common/Sidebar/SuperSidebar';
import Breadcrumb from '../common/Breadcrumb/';
import Aside from '../common/Aside/';
import Footer from '../common/Footer/';

const displayName = 'Admin Layout'
const propTypes = {
  children: PropTypes.node.isRequired,
}

function AdminLayout({ children }) {
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
        <SuperSidebar/>
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

AdminLayout.dispatch = displayName
AdminLayout.propTypes = propTypes

export default AdminLayout
