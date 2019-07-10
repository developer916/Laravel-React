import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import {
  Row, Col,
  Button,
} from 'reactstrap'

import _ from 'lodash'
import {NotificationManager} from 'react-notifications';

// load component
import LHtmlRow from "./LHtmlRow"
// load actions
import {lhtmlAddRow} from "./store/actions"
// load service
import {storeEditor} from "./service"
import {Trans, withTranslation} from 'react-i18next';
class LHtmlEditor extends Component {
  static displayName = "LHtmlEditor"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    templateType: PropTypes.string.isRequired,
    editor: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isViewHtml: false,
      templateType: props.templateType
    }

    this.onStoreEditor = this.onStoreEditor.bind(this)
    this.toggleViewHtmlCode = this.toggleViewHtmlCode.bind(this)
    this.renderHtmlCode = this.renderHtmlCode.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.templateType !== this.state.templateType) {
      this.setState({
        isViewHtml: false,
        templateType: nextProps.templateType
      })
    }
  }

  addRow() {
    const {dispatch, editor} = this.props

    let rowObj = {
      key: (editor.key + editor.general.rows),
      type: 'row',
      style: {
        boxSizing: 'border-box',
        height: '55px',
        paddingTop: '10px',
        paddingBottom: '10px',
      },
      settings: {
        idStr: '',
        classStr: ''
      },
      general: {
        column: 0
      },
      data: []
    }
    dispatch(lhtmlAddRow(rowObj))
  }

  onStoreEditor() {
    const {dispatch, editor, templateType, calendar} = this.props

    let params = {
      htmlCode: this.getHtmlCodeStr(),
      htmlJson: editor,
      calendarId: calendar.id,
      templateType: templateType
    }
    dispatch(storeEditor(params))
      .then(res => {
        if (res.result === 'success') {
          NotificationManager.success('Stored Html of Subscription successfully!', 'Success', 3000);
        }
      })
      .catch(({ error, statusCode }) => {
        if (statusCode === 422) {
          NotificationManager.warning('Error when store Html of Subscription, try again!', 'Error', 3000);
        }

      })
  }

  toggleViewHtmlCode() {
    this.setState({
      isViewHtml: !this.state.isViewHtml
    })
  }

  getHtmlCodeStr() {
    let editorDiv = document.getElementById("lhtml-editor-code"),
      copiedEditorDiv = editorDiv.cloneNode(true),
      editorRows = copiedEditorDiv.getElementsByClassName("lhtml-row")
    for(let idx = 0; idx < editorRows.length; idx ++) {
      let eachRow = editorRows[idx],
        eachColumns = eachRow.getElementsByClassName("lhtml-column")
      for(let index = 0; index < eachColumns.length; index ++) {
        let eachColumn = eachColumns[index],
          addButtons = eachColumn.getElementsByClassName("lhtml-add-button"),
          deleteButtons = eachColumn.getElementsByClassName("lhtml-delete-button")
        if (addButtons.length > 0) {eachColumn.removeChild(addButtons[0])}
        if (deleteButtons.length > 0){eachColumn.removeChild(deleteButtons[0])}
      }
      let addButtons = eachRow.getElementsByClassName("lhtml-add-button"),
        deleteButtons = eachRow.getElementsByClassName("lhtml-delete-button")
      if (addButtons.length > 0) {eachRow.removeChild(addButtons[0])}
      if (deleteButtons.length > 0) {eachRow.removeChild(deleteButtons[0])}
    }

    let htmlStr = copiedEditorDiv.innerHTML
    htmlStr = htmlStr.replace(/<button/g, "<a")
    htmlStr = htmlStr.replace(/button>/g, "a>")

    return '<div class="posbird-subscription" id="posbird-subscription">' + htmlStr + '</div>'
  }

  renderHtmlCode() {
    return (<div className="lhtml-view-code-body">
      {this.getHtmlCodeStr()}
    </div>)
  }

  render() {
    const { editor, calendar } = this.props

    let lhtmlRows = editor.data.map(each => {
      return (<LHtmlRow rowData={each} key={each.key} calendar={calendar}/>)
    })

    let styleAddRow = (editor.general.rows === 0 ? {marginTop: 0} : {marginTop: '15px'}),
      lhtmlViewCode = this.state.isViewHtml === true ? <div className="lhtml-view-code" style={{marginTop: '10px'}}>
        <Row style={{paddingTop: '15px', borderTop: '1px dashed rgba(170, 170, 170, 0.7)'}}>
          <Col md={12}>
            <h4>Html Code</h4>
            {this.renderHtmlCode()}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h4 style={{marginTop: '15px'}}>CSS Code</h4>
            <div className="lhtml-view-code-body">
              {".lhtml-button{text-decoration: none;color: #151b1e; background-color: #c0cadd;border-color: #c0cadd;display: inline-block;font-weight: 400;text-align: center;white-space: nowrap;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;border: 1px solid transparent;padding: 0.375rem 0.75rem;font-size: 0.875rem;line-height: 1.5;border-radius: 0;transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;align-items: flex-start;letter-spacing: normal;font: 400 13.3333px Arial;}"}
            </div>
          </Col>
        </Row>
      </div> : ''

    return (<div className="lhtml-container" style={editor.style}>
      <div className="lhtml-editor-code" id="lhtml-editor-code">
        {lhtmlRows}
      </div>
      <div className="lhtml-add-row" style={styleAddRow}>
        <Row>
          <Col md={8} xs={12} className="lhtml-add-row-button">
            <Button outline color="primary" onClick={() => this.addRow()}><i className="fa fa-plus fa-lg"></i>&nbsp;<Trans i18nKey="calendars.add_row"/></Button>
          </Col>
          <Col md={4} xs={12} className="lhtml-actions-button">
            <Button outline color="dark" onClick={() => this.toggleViewHtmlCode()} style={{marginRight: '5px'}}><i className="fa fa-code fa-lg"></i>&nbsp; <Trans i18nKey="calendars.view_code"/></Button>
            <Button outline color="success" onClick={() => this.onStoreEditor()}><i className="fa fa-save fa-lg"></i>&nbsp;<Trans i18nKey="calendars.store"/></Button>
          </Col>
        </Row>
      </div>
      {lhtmlViewCode}
    </div>)
  }
}

const mapStateToProps = state => {
  const {shbReducer} = state

  return {
    editor: shbReducer.editor,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LHtmlEditor));