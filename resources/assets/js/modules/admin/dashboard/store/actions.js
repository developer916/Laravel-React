import {
    SUPER_DATA_CHARTS_LIST,
    SUPER_CALENDAR_LIST,
    SUPER_DASHBOARD_DATA
} from './action-types';

export function list(payload, searchType, searchCalendarId) {
    return {
        type: SUPER_DATA_CHARTS_LIST,
        payload,
        searchType,
        searchCalendarId
    }
}

export function calendarList( payload){
    return {
        type: SUPER_CALENDAR_LIST,
        payload
    }
}

export function getDashboardData(payload) {
    return {
        type: SUPER_DASHBOARD_DATA,
        payload,
    }
}