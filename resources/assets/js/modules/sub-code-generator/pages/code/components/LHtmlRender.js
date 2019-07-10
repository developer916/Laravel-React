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
    editor: PropTypes.object.isRequired,
    uuid: PropTypes.any
  }

  constructor(props) {
    super(props)

    this.syncWithGoogleCalendar = this.syncWithGoogleCalendar.bind(this);
    this.syncWithOutlookCalendar = this.syncWithOutlookCalendar.bind(this);
    this.downloadAsICSFile = this.downloadAsICSFile.bind(this);
  }

  syncWithGoogleCalendar() {
    let pageLink = "";
    if(this.props.calendar.not === "false"){
        pageLink = "https://www.google.com/calendar/render?cid=webcal://" + window.location.host + "/ics/" + this.props.calendar.hashCode;
    } else {
        pageLink = "https://www.google.com/calendar/render?cid=webcal://" + window.location.host + "/ics/" + this.props.uuid + "/"+ this.props.calendar.hashCode;
    }
    window.open(pageLink, "_blank") //to open new page
  }

  syncWithOutlookCalendar() {
      let pageLink = "";
      if(this.props.calendar.not === "false"){
          pageLink = "https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&name=" + this.props.calendar.name  + "&url=webcal://" +
              window.location.host + "/ics/" + this.props.calendar.hashCode;
      } else {
          pageLink = "https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&name=" + this.props.calendar.name  + "&url=webcal://" +
              window.location.host + "/ics/" + this.props.uuid + "/" + this.props.calendar.hashCode;
      }
    window.open(pageLink, "_blank") //to open new page
  }

  downloadAsICSFile() {
      let pageLink = "";
      if(this.props.calendar.not === "false"){
          pageLink = window.location.origin + "/ics/" +
              this.props.calendar.hashCode +
              ".ics";
      } else {
          pageLink = window.location.origin + "/ics/" + this.props.uuid + "/" +
              this.props.calendar.hashCode +
              ".ics";
      }

    window.open(pageLink, "_blank");
  }
  syncWithAppleFile(){
      let pageLink = 'webcal://' + window.location.host + "/ics/"+ this.props.calendar.hashCode;
      window.open(pageLink);
  }

  render() {
    const {editor, uuid} = this.props

    let icsFileLink = window.location.origin + "/ics/" +
      this.props.calendar.hashCode +
      ".ics";
    let webcalIcsFileLink ="";
    if(this.props.calendar.not === "false") {
        webcalIcsFileLink = 'webcal://' + window.location.host + "/ics/"+ this.props.calendar.hashCode;
    } else {
        webcalIcsFileLink = 'webcal://' + window.location.host + "/ics/" + uuid + "/" + this.props.calendar.hashCode;
    }


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

    const renderApplelookBut = (button) =>{
        if (navigator.appVersion.indexOf("Mac") != -1) {
            return <a className="lhtml-button btn btn-secondary" style={button.style} key={button.key} href={webcalIcsFileLink}>
                {button.settings.icon === 'none' ? '' : <i className={`fa ` + iconList[button.settings.icon] + ` fa-lg`} style={{paddingRight: '8px'}}></i>}{button.settings.title}
            </a>
        } else {
          return "";
        }


        // {(() => {

            // if (navigator.appVersion.indexOf("Mac") != -1) {


                // return <a className="lhtml-button" style={button.style} key={button.key} href={webcalIcsFileLink}>
                //     {button.settings.icon === 'none' ? '' : <i className={`fa ` + iconList[button.settings.icon] + ` fa-lg`} style={{paddingRight: '8px'}}></i>}{button.settings.title}
                // </a>
            // }
        // })()}
    }

    const renderButton = (button) =>
      button.settings.type === 'google' ? renderGoogleBut(button) :
        button.settings.type === 'outlook' ? renderOutlookBut(button) :
            button.settings.type === 'apple' ? renderApplelookBut(button) :
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
          case "apple" :
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