import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from 'react-redux'

import {
  Row, Col,
  Input,
  TabContent, TabPane,
  Nav, NavItem, NavLink
} from 'reactstrap';
import classnames from 'classnames';

import _ from 'lodash'

// load lhtml-style
import lhtmlStyleValues from '../../../../../common/lhtml-style'
// load actions
import {lhtmlUpdateAttribute, lhtmlChangeType} from "./store/actions"

// get variables from lhtml-style
let keyValues = lhtmlStyleValues.keyValues,
  iconList = lhtmlStyleValues.iconList,
  colorKeys = lhtmlStyleValues.colorKeys,
  rowSample = lhtmlStyleValues.rowSample

// public function - return word by key
function changeKeyToWord(key) {
  return _.has(keyValues, key) ? keyValues[key] : key
}

class LHtmlStyle extends Component {
  static displayName = "LHtmlStyle"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    templateType: PropTypes.string.isRequired,
    selected: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'settings',
      templateType: props.templateType
    };

    this.toggle = this.toggle.bind(this);
    // render functions
    this.renderObjSettings = this.renderObjSettings.bind(this);
    this.renderObjStyle = this.renderObjStyle.bind(this);
    this.writeEachRow = this.writeEachRow.bind(this);
    this.onStyleIptChange = this.onStyleIptChange.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.templateType !== this.state.templateType) {
      this.setState({
        activeTab: 'settings',
        templateType: nextProps.templateType
      })
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onChangeType(name, value) {
    const {dispatch} = this.props

    let payload = {
      name: name,
      value: value,
    }

    dispatch(lhtmlChangeType(payload))
  }

  onStyleIptChange(name, value) {
    const {dispatch} = this.props

    let payload = {
      name: name,
      value: value,
    }

    dispatch(lhtmlUpdateAttribute(payload))
  }

  writeEachRow(key, value = '') {
    value = _.isEmpty(value) ? '' : value
    let self = this,
      convertedStr = changeKeyToWord(key),
      iptStr= "Enter " + convertedStr
    if (key === 'type') {
      let typeLists = lhtmlStyleValues.iconTypeList,
        iptValue = value,
        classNameStr = "lhtml-style-obj-each " + "lhtml-style-" + key;
      let keyOptions = typeLists.map(each => {
        return (<option value={each} key={`lhtml-style-type-` + each}>{changeKeyToWord(each)}</option>)
      })

      return (<div className={classNameStr} key={`style_` + key}>
        <Row>
          <Col className="lhtml-style-obj-key" md={5} style={{ paddingRight: 0, paddingTop: '7px', paddingBottom: '7px' }}>
            {convertedStr}
          </Col>
          <Col className="lhtml-style-obj-value" md={7} style={{ paddingLeft: 0 }}>
            <Input type="select" name="type" className={classNameStr} value={iptValue} onChange={(e) => self.onChangeType(e.target.name, e.target.value)}>
              {keyOptions}
            </Input>
          </Col>
        </Row>
      </div>)
    } else if (key === 'icon') {
      let classNameStr = "lhtml-style-obj-each " + "lhtml-style-" + key,
        iconClassNameStr = "fa " + iconList[value] + " fa-lg";

      return (<div className={classNameStr} key={`style_` + key}>
        <Row>
          <Col className="lhtml-style-obj-key" md={5} style={{ paddingRight: 0, paddingTop: '7px', paddingBottom: '7px' }}>
            {convertedStr}
          </Col>
          <Col className="lhtml-style-obj-value" md={7} style={{ paddingLeft: 0 }}>
            {value === 'none' ? '': <i className={iconClassNameStr}></i>}
          </Col>
        </Row>
      </div>)
    } else {
      let isColor = colorKeys.includes(key),
        type = isColor ? 'color' : 'text',
        iptValue = isColor ? (value ? value : '#ffffff') : value,
        classNameStr = "lhtml-style-obj-each " + "lhtml-style-" + key;
      return (<div className={classNameStr} key={`style_` + key}>
        <Row>
          <Col className="lhtml-style-obj-key" md={5} style={{ paddingRight: 0, paddingTop: '7px', paddingBottom: '7px' }}>
            {convertedStr}
          </Col>
          <Col className="lhtml-style-obj-value" md={7} style={{ paddingLeft: 0 }}>
            <Input type={type} id={key} name={key} placeholder={iptStr} value={iptValue} onChange={(e) => self.onStyleIptChange(e.target.name, e.target.value)}/>
          </Col>
        </Row>
      </div>)
    }
  }

  renderObjSettings(obj) {
    let self = this
    let objEachs = Object.keys(obj).map(function(key) {
      return self.writeEachRow(key, obj[key])
    })

    return (<div className="lhtml-style-obj-group">
      {objEachs}
    </div>)
  }

  renderObjStyle(obj) {
    let self = this
    let objEachs = rowSample.map(function(each) {
      if (_.has(each, 'values')) {
        let objValues = each.values.map(function(value) {
          if (_.has(obj, value)) {
            return self.writeEachRow(value, obj[value])
          } else {
            return self.writeEachRow(value)
          }
        })

        let convertedStr = changeKeyToWord(each.key)

        return (<div className="lhtml-style-obj-sub-group" key={each.key}>
          <hr style={{ margin: '10px 0 10px 0', borderColor: '#5f5656' }}/>
          <h5 className="text-center" style={{ marginTop: '0' }}>{convertedStr}</h5>
          {objValues}
        </div>)
      } else {
        if (_.has(obj, each.key)) {
          return self.writeEachRow(each.key, obj[each.key])
        } else {
          return self.writeEachRow(each.key)
        }
      }
    })

    return (<div className="lhtml-style-obj-group">
      {objEachs}
    </div>)
  }

  renderStyle(obj) {
    return (<div className="lhtml-style-row">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === 'settings' })}
            onClick={() => { this.toggle('settings'); }}
          >
            Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === 'style' })}
            onClick={() => { this.toggle('style'); }}
          >
            Style
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="settings">
          {this.renderObjSettings(obj.settings)}
        </TabPane>
        <TabPane tabId="style">
          {this.renderObjStyle(obj.style)}
        </TabPane>
      </TabContent>
    </div>)
  }

  render() {
    const {selected} = this.props
    if (_.isEmpty(selected)) {
      return (<div className="lhtml-style">
        <h5 className="text-center" style={{ paddingTop: '36px', paddingBottom: '36px', margin: 0 }}>Non Selected</h5>
      </div>)
    } else {
      return (<div className="lhtml-style">
        {this.renderStyle(selected)}
      </div>)
    }
  }
}

const mapStateToProps = state => {
  const {shbReducer} = state

  return {
    selected: shbReducer.selected,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LHtmlStyle);