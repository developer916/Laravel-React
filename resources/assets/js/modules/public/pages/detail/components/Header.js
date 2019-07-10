import React from "react"

const displayName = "DetailOfCalendarHeader"

function Header(props) {
  if (props.calendar.picture) {
    return <header className="bg-primary" style={{ backgroundImage: `url(uploads/${props.calendar.picture})` }}>
      <img className="company-logo" src="/images/company-default-logo.png"/>
    </header>
  } else {
    return <header className="bg-primary">
      <img className="company-logo" src="/images/company-default-logo.png"/>
    </header>
  }
}
Header.displayName = displayName

export default Header
