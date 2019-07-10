import React, { Component } from "react"
import PropTypes from "prop-types"
import {connect} from 'react-redux'

import _ from 'lodash'
import {
  Row, Col,
  Button,
} from 'reactstrap'

// load static lhtml-style
import lhtmlStyleValues from '../../../../../common/lhtml-style'

const iconList = lhtmlStyleValues.iconList

class LHtmlRender extends Component {
  static displayName = "LHtmlRender"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.syncWithGoogleCalendar = this.syncWithGoogleCalendar.bind(this);
    this.syncWithOutlookCalendar = this.syncWithOutlookCalendar.bind(this);
    this.downloadAsICSFile = this.downloadAsICSFile.bind(this);
  }

  syncWithGoogleCalendar() {
    let pageLink = "https://www.google.com/calendar/render?cid=webcal://" +
      window.location.host + "/ics/" + this.props.calendar.hashCode;
    window.open(pageLink, "_blank") //to open new page
  }

  syncWithOutlookCalendar() {
    let pageLink = "https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&name=" + this.props.calendar.name  + "&url=webcal://"
        + window.location.host + "/ics/" + this.props.calendar.hashCode;
    // let pageLink = "https://calendar.live.com/calendar/calendar.aspx?rru=addsubscription&name=" +
    //   this.props.calendar.name +
    //   "&url=" +
    //   window.location.origin + "/ics/" + this.props.calendar.hashCode + ".ics";
    window.open(pageLink, "_blank") //to open new page
  }

  downloadAsICSFile() {
    let pageLink = window.location.origin + "/ics/" +
      this.props.calendar.hashCode +
      ".ics";
    window.open(pageLink, "_blank");
  }

  render() {
    const {editor} = this.props

    let icsFileLink = window.location.origin + "/ics/" +
      this.props.calendar.hashCode +
      ".ics";

    /* start - render button */
    const renderGoogleBut = (button) => {
      return <Button className="lhtml-button" style={button.style} key={button.key} onClick={() => this.syncWithGoogleCalendar()}>
        {button.settings.icon === 'none' ? '' : <i className={`fa ` + iconList[button.settings.icon] + ` fa-lg`} style={{paddingRight: '8px'}}></i>}{button.settings.title}
      </Button>
    }

    const renderOutlookBut = (button) => {
      return <Button className="lhtml-button" style={button.style} key={button.key} onClick={() => this.syncWithOutlookCalendar()}>
        {button.settings.icon === 'none' ? '' : <i className={`fa ` + iconList[button.settings.icon] + ` fa-lg`} style={{paddingRight: '8px'}}></i>}{button.settings.title}
      </Button>
    }

    const renderDownloadBut = (button) => {
      return <Button className="lhtml-button" style={button.style} key={button.key} onClick={() => this.downloadAsICSFile()}>
        {button.settings.icon === 'none' ? '' : <i className={`fa ` + iconList[button.settings.icon] + ` fa-lg`} style={{paddingRight: '8px'}}></i>}{button.settings.title}
      </Button>
    }

    const renderButton = (button) =>
      button.settings.type === 'google' ? renderGoogleBut(button) :
        button.settings.type === 'outlook' ? renderOutlookBut(button) :
          renderDownloadBut(button)
    /* end - render button */

    /* start - render text */
    const renderText = (text) => {
      return <div style={text.style} key={text.key}>
        {text.settings.title}
      </div>
    }
    /* end - render text */

    /* start - render link */
    const renderLink = (link) => {
      return <div style={link.style} key={link.key}>
        {icsFileLink}
      </div>
    }
    /* end - render link */

    const renderElements = (elements) => {
      return elements.map(element => {
        switch (element.settings.type) {
          case "none":
          case "google":
          case "outlook":
          case "download":
            return renderButton(element)
          case "text":
            return renderText(element)
          case "link":
            return renderLink(element)
        }
      })
    }

    const renderColumns = (columns) => {
      return columns.map(column => {
        return <div className="lhtml-column" style={column.style} key={column.key}>
          {renderElements(column.data)}
        </div>
      })
    }

    const renderRows = (rows) => {
      return rows.map(row => {
        return <div className="lhtml-row" style={row.style} key={row.key}>
          {renderColumns(row.data)}
        </div>
      })
    }

    return (<div className="lhtml-render">
      {renderRows(editor.data)}
    </div>)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapDispatchToProps)(LHtmlRender);