import React, { Component } from "react"
import PropTypes from "prop-types"
import { Input } from "reactstrap"

import Datamap from './components/Datamap'
import { dataList } from '../../service'
import { list } from '../../../calendar/service'
import {Trans, withTranslation} from 'react-i18next';
// custom - manage color of datamap
function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(color) {
  return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

function lightenColor(colorJson, atm) {
  return atm === 100
    ? (
      rgbToHex(colorJson)
    ): (
      rgbToHex({
        r: colorJson.r + parseInt(atm * 1.91),
        g: colorJson.g + parseInt(atm * 1.38),
        b: colorJson.b + parseInt(atm * 0.82)
      })
    )
}

class Page extends Component {
  static displayName = "SuperWorldMap"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    calendars: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    maxValue: PropTypes.any,
    searchType: PropTypes.any,
    searchCalendarId: PropTypes.any,
    companyId: PropTypes.any.isRequired,
  }

  defaultColorJson = { r: 26, g: 85, b: 158 }
  fillsObj = { defaultFill: "#d9dff0" }

  constructor(props) {
    super(props);

    this.state = {
      types: [
        { name: '1w', type: 'week' },
        { name: '4w', type: 'month' },
        { name: '1y', type: 'year' },
        { name: 'All', type: '' },
      ]
    }

    this.onType = this.onType.bind(this);
    this.onChangeCalendar = this.onChangeCalendar.bind(this);
  }

  loadData(type, calendarId) {
    const { dispatch, companyId } = this.props

    this.fillsObj = { defaultFill: "#d9dff0" } // clear fillsObj for datamap
    dispatch(dataList({companyId: companyId, type: type, calendarId: calendarId}))
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(list())
  }

  componentWillMount() {
    const { searchType, searchCalendarId } = this.props
    this.loadData(searchType, searchCalendarId)
  }

  dataToJsonObj(data, maxValue) {
    let jsonObj = {}

    data.map(each => {
      let eachJsonValue = {
        fillKey: each.code,
        value: each.value
      }
      jsonObj[each.code] = eachJsonValue
      this.fillsObj[each.code] = lightenColor(this.defaultColorJson, parseInt(100 * each.value / maxValue))
    });

    return jsonObj
  }

  onType(type) {
    const { searchCalendarId } = this.props

    this.loadData(type, searchCalendarId)
  }

  onChangeCalendar(calendarId) {
    const { searchType } = this.props

    this.loadData(searchType, calendarId)
  }

  renderCalendars() {
    const { searchCalendarId, calendars, t } = this.props

    let calendarsList = calendars.map(each => {
      return (
        <option value={ each.id } key={ each.id }>{ each.name }</option>
      )
    })

    return (
      <Input className="float-right actions-select" type="select" name="searchCalendarId" defaultValue={ searchCalendarId } onChange={(e)=> this.onChangeCalendar(e.target.value)}>
        <option value="">-- {t("normal.all_calendars")} --</option>
        { calendarsList }
      </Input>
    )
  }

  renderTypes() {
    const { searchType } = this.props

    let typesBar = this.state.types.map(each => {
      return (<li onClick={() => this.onType(each.type)} className={each.type === searchType ? 'active' : ''} key={each.type}>
        { each.name }
      </li>)
    })

    return (
      <ul className="float-right actions-group">
        { typesBar }
      </ul>
    )
  }

  render() {
    const { data, maxValue } = this.props
    let dataJsonObj = maxValue ? this.dataToJsonObj(data, maxValue) : {}

    const props = {
      data: dataJsonObj,
      fills: this.fillsObj,
    }

    return (<div className="animated">
      <div className="world-map">
        <div className="custom-card-header">
          <i className="icon-map"></i> <Trans i18nKey="normal.geolocation_world_map"/>
          { this.renderTypes() }
          { this.renderCalendars() }
        </div>
        <Datamap
          {...props}
          geographyConfig={{
            highlightBorderColor: '#bada55',
            popupTemplate: (geography, data) =>
              `<div class='hoverinfo'>${geography.properties.name} => Visits: ${data ? data.value : '0'}`,
            highlightBorderWidth: 1
          }}
        />
      </div>
    </div>)
  }
}

export default  withTranslation()(Page)
