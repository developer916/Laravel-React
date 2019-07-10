// import libs
import { connect } from 'react-redux'

import Calendar from '../../Calendar'
// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  const { auth, codeGenerator, shbReducer } = state

  const calendar = state.calendar.calendarList.find(calendar => calendar.id === Number(params.id))

  return {
    companyId: auth.companyId,
    data: codeGenerator.codeData,
    selected: shbReducer.selected,
    license: auth.license,
    calendar: calendar ? new Calendar(calendar) : new Calendar({})
  }
}

export default connect(mapStateToProps)(Page)
