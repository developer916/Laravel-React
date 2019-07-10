import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from 'react-redux'

import {
  Button,
} from 'reactstrap'

// load actions
import {lhtmlSelect, lhtmlRemove} from "./store/actions"
// load static lhtml-style
import lhtmlStyleValues from '../../../../../common/lhtml-style'
import {Trans, withTranslation} from 'react-i18next';
// get variables from lhtml-style
let iconList = lhtmlStyleValues.iconList

class LHtmlColumn extends Component {
  static displayName = "LHtmlColumn"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    columnData: PropTypes.object.isRequired,
    selected: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.selectElement = this.selectElement.bind(this)
  }

  selectElement(e, element) {
    e.stopPropagation();

    const {dispatch} = this.props

    dispatch(lhtmlSelect(element))
  }

  remove() {
    const {selected, dispatch} = this.props

    dispatch(lhtmlRemove(selected))
  }

  render() {
    const {calendar, selected, columnData} = this.props
    const icsFileLink = window.location.origin + "/ics/" + calendar.hashCode + ".ics"

    const webCalLink = 'webcal://' + window.location.host + "/ics/" + calendar.hashCode + ".ics"

    /* start - render element */
    const renderButton = (button) => {

      const lhtmlButtonClassName = "lhtml-button " + (button.key === selected.key ? "lhtml-selected" : "");
      if(button.settings.type === 'apple'){
        const webcalPath  = webCalLink;
          return (<button className={lhtmlButtonClassName + " btn btn-secondary"} href={webcalPath} style={button.style} key={button.key} onClick={(e) => this.selectElement(e, button)}>
                {button.settings.icon === 'none' ? '' : <i className={`fa ` + iconList[button.settings.icon] + ` fa-lg`}></i>}{button.settings.title}
              </button>)
      } else {
        const hrefPath = button.settings.type === 'google' ?
          "https://www.google.com/calendar/render?cid=" + webCalLink :
          button.settings.type === 'outlook' ?
              "https://calendar.live.com/calendar/calendar.aspx?rru=addsubscription&name=" + calendar.name + "&url=" + icsFileLink :
              icsFileLink

        return <button className={lhtmlButtonClassName + " btn btn-secondary"} href={hrefPath} target="_blank" style={button.style} key={button.key} onClick={(e) => this.selectElement(e, button)}>
            {button.settings.icon === 'none' ? '' : <i className={`fa ` + iconList[button.settings.icon] + ` fa-lg`}></i>}{button.settings.title}
        </button>
      }
    }
    const renderText = (text) => {
      const lhtmlTextClassName = "lhtml-text " + (text.key === selected.key ? "lhtml-selected" : "")

      return <div className={lhtmlTextClassName} style={text.style} key={text.key} onClick={(e) => this.selectElement(e, text)}>
        {text.settings.title}
      </div>
    }
    const renderLink = (link) => {
      const lhtmlTextClassName = "lhtml-link " + (link.key === selected.key ? "lhtml-selected" : "")
      const icsFileLink = window.location.origin + "/ics/" + calendar.hashCode + ".ics"

      return <div className={lhtmlTextClassName} style={link.style} key={link.key} onClick={(e) => this.selectElement(e, link)}>
        {icsFileLink}
      </div>
    }
    /* end - render element */

    let elements = columnData.data.map(each => {
      switch (each.settings.type) {
        case "none":
        case "google":
        case "outlook":
        case "apple":
        case "download":
          return renderButton(each)
        case "text":
          return renderText(each)
        case "link":
          return renderLink(each)
      }
    });

    const lhtmlColumnClassName = "lhtml-column " + (columnData.key === selected.key ? "lhtml-selected" : "")

    return (<div className={lhtmlColumnClassName} style={columnData.style} onClick={(e) => this.selectElement(e, columnData)}>
      {elements}
      <Button outline color="danger" onClick={() => this.remove()} className="lhtml-delete-button"><i className="fa fa-trash fa-lg"></i>&nbsp;<Trans i18nKey="common.delete"/></Button>
    </div>)
  }
}

const mapStateToProps = state => {
  const {shbReducer} = state

  return {
    selected: shbReducer.selected
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LHtmlColumn));