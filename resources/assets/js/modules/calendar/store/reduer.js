import Calendar from '../Calendar';
import moment from 'moment'
import {
  CALENDAR_LIST,
  LOAD_CALENDAR_LIST,
  ADD_NEW_CALENDAR,
  DELETE_CALENDAR,
  SELECTED_CALENDAR,
  UPDATE_CALENDAR,
  CURRENT_CALENDAR_EVENTS,
  ADD_NEW_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_EVENT_SHORTLINK,
  GET_CALENDAR
} from './action-types';

const initialState = {
  calendarList: [],
  selectedCalendar: {},
  calendar: new Calendar({}),
  calendarEvents: [],
  editor: {},
  calendarCategories: []
};

const reducer = (state = initialState, {type, calendarList = [], calendar = {}, event = {}, eventId = 0, payload}) => {
  switch (type) {
    case CALENDAR_LIST:
      return setCalendarList(state, calendarList);
    case LOAD_CALENDAR_LIST:
      return loadCalendarList(state);
    case ADD_NEW_CALENDAR:
      return addNewCalendar(state, calendar);
    case DELETE_CALENDAR:
      return deleteCalendar(state, calendar);
    case SELECTED_CALENDAR:
      return selectedCalendar(state, calendar);
    case UPDATE_CALENDAR:
      return updateCalendar(state, calendar);
    case CURRENT_CALENDAR_EVENTS:
      return setCalendarEvents(state, payload);
    case ADD_NEW_EVENT:
      return addNewCalendarEvent(state, event);
    case DELETE_EVENT:
      return deleteCalendarEvent(state, eventId);
    case UPDATE_EVENT:
      return updateCalendarEvent(state, event);
    case GET_EVENT_SHORTLINK:
      return getEventShortLink(state, payload);
    case GET_CALENDAR:
      return getCalendar(state, payload);
    default:
      return state;
  }
};

function getEventShortLink(state, payload) {
  return {
    ...state,
    event: {
      ...event,
      hashCode: payload.hashCode,
      shortLink: payload.shortLink
    }
  }
}

function setCalendarList(state, calendarList) {
  localStorage.setItem('calendarList', calendarList);

  return {
    ...state, calendarList: calendarList,
  }
}

function loadCalendarList(state) {
  state = Object.assign({}, state, {
    companyList: localStorage.getItem('companyList'),
  });

  return state;
}

function addNewCalendar(state, calendar) {
  let calendarList = state.calendarList;
  calendarList.push(calendar);
  localStorage.setItem('calendarList', calendarList);
  return {
    ...state, calendarList: calendarList
  }
}

function convertUTCToLocal(date){
    let localTime  = moment.utc(date).toDate();
    localTime = moment(localTime);
    return localTime.format('YYYY-MM-DD HH:mm');
}



function deleteCalendar(state, calendar) {
  let calendarList = state.calendarList;
  for (let i = 0; i < calendarList.length; i ++) {
    if (calendarList[i].id === calendar.id) {
      calendarList.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('calendarList', calendarList);
  return {
    ...state, calendarList: calendarList
  }
}

function deleteCalendarEvent(state, eventId) {
  let calendarEvents = state.calendarEvents;
  for (let i = 0; i < calendarEvents.length; i ++) {
    if (calendarEvents[i].id === eventId) {
      calendarEvents.splice(i, 1);
      break;
    }
  }
  return {
    ...state, calendarEvents: calendarEvents
  }
}

function updateCalendar(state, calendar) {
  let calendarList = state.calendarList;
  for (let i = 0; i < calendarList.length; i ++) {
    if (calendarList[i].id === calendar.id) {
      calendarList[i] = calendar;
      break;
    }
  }
  localStorage.setItem('calendarList', calendarList);
  return {
    ...state, calendarList: calendarList
  }
}

function addNewCalendarEvent(state, event) {
    let calendarEvents = state.calendarEvents;
    let calendarEvent = event;
    calendarEvent['title'] = event['summary'];
    // calendarEvent['start'] = new Date(event['dateFrom']);
    // calendarEvent['end'] = new Date(event['dateTo']);
    let convertUTCtoLocalFrom = convertUTCToLocal(event['dateFrom']);
    let convertUTCtoLocalTo = convertUTCToLocal(event['dateTo']);
    calendarEvent['dateFrom'] = convertUTCtoLocalFrom;
    calendarEvent['dateTo'] = convertUTCtoLocalTo;
    calendarEvent['start'] = new Date(convertUTCtoLocalFrom);
    calendarEvent['end'] = new Date(convertUTCtoLocalTo);

    calendarEvents.push(calendarEvent);
    return {
        ...state, calendarEvents: calendarEvents
    }
}

function updateCalendarEvent(state, event) {
  let calendarEvents = state.calendarEvents;
  for (let i = 0; i < calendarEvents.length; i ++) {
    if (calendarEvents[i].id === event.id) {
      // console.log("event", event);
      calendarEvents[i] = event;
      calendarEvents[i]['title'] = event['summary'];
      let convertUTCtoLocalFrom = convertUTCToLocal(calendarEvents[i].dateFrom);
      let convertUTCtoLocalTo = convertUTCToLocal(calendarEvents[i].dateTo);
      calendarEvents[i].dateFrom = convertUTCtoLocalFrom;
        calendarEvents[i].dateTo = convertUTCtoLocalTo;
      calendarEvents[i].start= new Date(convertUTCtoLocalFrom);
      calendarEvents[i].end = new Date(convertUTCtoLocalTo);
      // // calendarEvents[i]['start'] = new Date(event['dateFrom']);
      // // calendarEvents[i]['end'] = new Date(event['dateTo']);
      break;
    }
  }
  return {
    ...state, calendarEvents: calendarEvents
  }
}

function setCalendarEvents(state, payload) {
    let calendarEvents = payload.events;
    for (let i = 0; i < calendarEvents.length; i ++) {
      calendarEvents[i].title = calendarEvents[i].summary;
      // calendarEvents[i].start = new Date(calendarEvents[i].dateFrom);
      // calendarEvents[i].end = new Date(calendarEvents[i].dateTo);
        let convertUTCtoLocalFrom = convertUTCToLocal(calendarEvents[i].dateFrom);
        let convertUTCtoLocalTo = convertUTCToLocal(calendarEvents[i].dateTo);
        calendarEvents[i].dateFrom = convertUTCtoLocalFrom;
        calendarEvents[i].dateTo = convertUTCtoLocalTo;
        calendarEvents[i].start= new Date(convertUTCtoLocalFrom);
        calendarEvents[i].end = new Date(convertUTCtoLocalTo);
    }

    return {
        ...state,
        calendarEvents: calendarEvents,
        editor: payload.htmlJson
    }
}

function selectedCalendar(state, calendar) {
  return {
    ...state, selectedCalendar: calendar
  }
}

function getCalendar(state, payload){
    return {
        ...state,
        calendar: payload.calendar,
        selectedCalendar: payload.calendar,
        calendarCategories : payload.calendarCategories
    }
}


export default reducer;
