import React from "react"
import { Trans, withTranslation} from "react-i18next";
const displayName = "HomePageHeader"

function Header() {
  return <header className="bg-primary text-white">
    <div className="container text-center">
      <img width="125" height="125" src="/images/company-default-logo.png" alt="..." className="rounded-circle" />
      <h1>PosBill calout</h1>
      <p className="lead"><Trans i18nKey="home.site_description"/></p>
    </div>
  </header>
}
Header.displayName = displayName

export default withTranslation()(Header)
