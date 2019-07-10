import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from 'react-redux'

import {
  Button,
} from 'reactstrap'

// load components
import LHtmlColumn from "./LHtmlColumn"
// load actions
import {lhtmlSelect, lhtmlAddButton, lhtmlRemove} from "./store/actions"

class LHtmlRow extends Component {
  static displayName = "LHtmlRow"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    rowData: PropTypes.object.isRequired,
    selected: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.selectElement = this.selectElement.bind(this)
    this.addButton = this.addButton.bind(this)
    this.remove = this.remove.bind(this)
  }

  addButton() {
    const {dispatch, rowData} = this.props
    let objKey = (rowData.key + rowData.general.column), dataKey = objKey + '0'

    const obj = {
      rowObj: rowData,
      columnObj: {
        key: (rowData.key + rowData.general.column),
        type: 'column',
        style: {
          boxSizing: 'border-box',
          float: 'left',
          paddingLeft: '15px',
          paddingRight: '15px',
          height: '100%',
        },
        settings: {
          idStr: '',
          classStr: ''
        },
        general: {
          button: 1
        },
        data: [
          {
            key: dataKey,
            type: 'button',
            style: {
              boxSizing: 'border-box',
              height: '100%',
              color: '#151b1e',
              backgroundColor: '#c0cadd',
              borderColor: '#c0cadd',
            },
            settings: {
              type: 'none',
              title: 'Button',
              icon: 'none',
              idStr: '',
              classStr: '',
            },
          }
        ]
      }
    }

    dispatch(lhtmlAddButton(obj))
  }

  remove() {
    const {selected, dispatch} = this.props

    dispatch(lhtmlRemove(selected))
  }

  selectElement(element) {
    const {dispatch} = this.props

    dispatch(lhtmlSelect(element))
  }

  render() {
    const {selected, rowData} = this.props

    let lhtmlColumns = rowData.data.map(each => {
      console.log("each_data", each);
      return (
        <LHtmlColumn columnData={each} key={each.key}/>
      )
    });

    const lhtmlRowClassName = "lhtml-row " + (rowData.key === selected.key ? "lhtml-selected" : "")

    return (<div className={lhtmlRowClassName} style={rowData.style}  onClick={() => this.selectElement(rowData)}>
      {lhtmlColumns}
      <Button outline color="primary" onClick={() => this.addButton()} className="lhtml-add-button"><i className="fa fa-plus fa-lg"></i>&nbsp;Add Element</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LHtmlRow);