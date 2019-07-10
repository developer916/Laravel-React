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

// get variables from lhtml-style
let iconList = lhtmlStyleValues.iconList

class LHtmlColumn extends Component {
  static displayName = "LHtmlColumn"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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
    const {selected, columnData} = this.props
    console.log("column_data" , columnData);

    /* start - render element */
    const renderButton = (button) => {
      const lhtmlButtonClassName = "lhtml-button " + (button.key === selected.key ? "lhtml-selected" : "")

      console.log("button", button);

      return <Button className={lhtmlButtonClassName} style={button.style} key={button.key} onClick={(e) => this.selectElement(e, button)}>
        {button.settings.icon === 'none' ? '' : <i className={`fa ` + iconList[button.settings.icon] + ` fa-lg`}></i>}{button.settings.title}
      </Button>
    }
    const renderText = (text) => {
      const lhtmlTextClassName = "lhtml-text " + (text.key === selected.key ? "lhtml-selected" : "")

      return <div className={lhtmlTextClassName} style={text.style} key={text.key} onClick={(e) => this.selectElement(e, text)}>
        {text.settings.title}
      </div>
    }
    const renderLink = (link) => {
      const lhtmlTextClassName = "lhtml-link " + (link.key === selected.key ? "lhtml-selected" : "")

      return <div className={lhtmlTextClassName} style={link.style} key={link.key} onClick={(e) => this.selectElement(e, link)}>
        {link.settings.title}
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
      <Button outline color="danger" onClick={() => this.remove()} className="lhtml-delete-button"><i className="fa fa-trash fa-lg"></i>&nbsp;Delete</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LHtmlColumn);