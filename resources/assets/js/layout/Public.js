//import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import ScrollTop from '../common/scroll-top'
import Footer from '../common/Footer/PublicFooter'
const displayName = 'Public Layout'
const propTypes = {
  children: PropTypes.node.isRequired,
}

function PublicLayout({ children }) {
    return <div>
              <main style={{ minHeight: 'calc(100vh - 50px)'}}>
                  { children }
                <ScrollTop />
              </main>
              <Footer/>
            </div>
}

PublicLayout.dispatch = displayName
PublicLayout.propTypes = propTypes

export default PublicLayout
