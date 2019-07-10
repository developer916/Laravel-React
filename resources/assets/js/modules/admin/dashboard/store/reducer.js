import {
    SUPER_DATA_CHARTS_LIST,
    SUPER_CALENDAR_LIST,
    SUPER_DASHBOARD_DATA
} from './action-types'

const initialState = {
    data: [],
    searchType: 'week',
    searchCalendarId: '',
    calendarList: [],
    calendars: [],
    subscribers: [],
    upcomingEvents: [],
}

const reducer = (state = initialState, { type, payload = null, searchType = 'week', searchCalendarId = '' }) => {
    switch(type) {
        case SUPER_DATA_CHARTS_LIST:
            return list(state, payload, searchType, searchCalendarId)
        case SUPER_CALENDAR_LIST:
            return calendars(state, payload);
        case SUPER_DASHBOARD_DATA:
            return getDashboardData(state, payload);
        default:
            return state
    }
}

function list(state, payload, searchType, searchCalendarId) {
    state = Object.assign({}, state, { data: payload.data, searchType: searchType, searchCalendarId: searchCalendarId })

    return state
}

function calendars(state, payload){
    state = Object.assign({}, state, { calendarList: payload })

    return state
}

function getDashboardData(state, payload) {
    state = Object.assign({}, state, {
        calendars: payload.calendarData,
        subscribers: payload.subscribersData,
        upcomingEvents: payload.upcomingEvents,
    });

    return state
}

export default reducer;