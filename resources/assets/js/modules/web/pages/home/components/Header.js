import React from "react"

const displayName = "HomePageHeader"

function Header() {
  return <header className="bg-primary text-white">
    <div className="container text-center">
      <img width="125" height="125" src="/images/company-default-logo.png" alt="..." className="rounded-circle" />
      <h1>PosBill calout</h1>
      <p className="lead">Teile dein Termin mit wem du willst</p>
    </div>
  </header>
}
Header.displayName = displayName

export default Header
