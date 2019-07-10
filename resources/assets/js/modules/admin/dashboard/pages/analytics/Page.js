import React, { Component } from "react"
import PropTypes from "prop-types"
import { Card, CardHeader, CardBody, Input} from 'reactstrap';
import { dataList, list } from '../../service';
import { Bar } from 'react-chartjs-2';
import {Trans, withTranslation } from 'react-i18next';

class Page extends Component {
  static displayName = "SuperAnalytics"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    calendars: PropTypes.array.isRequired,
    searchType: PropTypes.any,
    searchCalendarId: PropTypes.any,
  }

  constructor(props) {
    super(props);

    this.state = {
      types: [
          { name: '1w', type: 'week' },
          { name: '4w', type: 'month' },
          { name: '1y', type: 'year' },
      ]
    }

    this.onType = this.onType.bind(this);
    this.onChangeCalendar = this.onChangeCalendar.bind(this);
  }

  componentWillMount() {
    const { searchType, searchCalendarId } = this.props

    this.loadData(searchType, searchCalendarId)
  }
  componentDidMount() {
      const { dispatch } = this.props

      dispatch(list())
  }

  loadData(type, calendarId) {
      const { dispatch } = this.props

      dispatch(dataList({type: type, calendarId: calendarId}))
  }

  //render bar

    dataToBarData() {
      const { data, searchType, t } = this.props
      let labels = [], dataValues = [], curDate = new Date(), rgbStr = ""

      if (searchType === 'week') {
        curDate.setDate(curDate.getDate() - 7)
        rgbStr = "255,99,132"
      } else if (searchType === 'month') {
        // curDate.setDate(curDate.getDate() - 30)
        curDate.setMonth(curDate.getMonth() - 1);
        rgbStr = "75,192,192"
      } else {
        curDate.setMonth(curDate.getMonth() - 11)
        rgbStr = "32,168,216"
      }

      data.map((each) => {
        let curDateStr = curDate.getDate() + '.' + (curDate.getMonth() + 1) + '.' +  curDate.getFullYear()
        labels.push(curDateStr)
        if (searchType === 'week' || searchType === 'month') {
          curDate.setDate(curDate.getDate() + 1)
        } else {
          curDate.setMonth(curDate.getMonth() + 1)
        }
        dataValues.push(each)
      })

      return {
        labels: labels,
        datasets: [
          {
            label: t('admin.subscribers_of_calendars'),
            backgroundColor: `rgba(${rgbStr},0.2)`,
            borderColor: `rgba(${rgbStr},1)`,
            borderWidth: 1,
            hoverBackgroundColor: `rgba(${rgbStr},0.4)`,
            hoverBorderColor: `rgba(${rgbStr},1)`,
            data: dataValues
          }
        ]
      }
    }

    //render calendars
    renderCalendars() {
      const { searchCalendarId, calendars, t } = this.props
      let calendarsList= '';
      if(calendars.length > 0 ){
          calendarsList = calendars.map(each => {
              return (
                  <option value={ each.id } key={ each.id }>{ each.name }</option>
              )
          })
      }


      return (
          <Input className="float-right actions-select" type="select" name="searchCalendarId" defaultValue={ searchCalendarId } onChange={(e)=> this.onChangeCalendar(e.target.value)}>
            <option value="">-- {t("normal.all_calendars")} --</option>
              { calendarsList }
          </Input>
      )
    }
   //render types
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

    onType(type) {
      const { searchCalendarId } = this.props

      this.loadData(type, searchCalendarId)
    }

    onChangeCalendar(calendarId) {
      const { searchType } = this.props

      this.loadData(searchType, calendarId)
    }

  render() {

      let barData = this.dataToBarData()
      return (
        <Card>
          <CardHeader className="custom-card-header">
            <i className="icon-chart"></i> <Trans i18nKey="admin.subscribers_of_calendars"/>
              { this.renderTypes() }
              { this.renderCalendars() }
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              <Bar data={ barData }
                   options={{
                       maintainAspectRatio: false,
                       scales: {
                           yAxes: [{
                               ticks: {
                                   beginAtZero: true,
                               }
                           }]
                       }
                   }}
              />
            </div>
          </CardBody>
        </Card>);
  }
}

export default withTranslation()(Page)
