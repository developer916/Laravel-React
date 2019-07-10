import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as calendarActions from './store/actions'
import moment from 'moment'


export function create(calendar) {


  const formData = new FormData();

  formData.append('company_id', calendar.company_id);
  formData.append('name', calendar.name);
  formData.append('description', calendar.description);
  formData.append('public', calendar.is_private);
  formData.append('status', calendar.is_offline);
  formData.append('not', calendar.is_email_necessary);
  formData.append('image', calendar.background[0]);
  formData.append('categories', calendar.category);



  if (calendar.calendar_id) {
    formData.append('calendar_id', calendar.calendar_id);
  }

    // console.log("formData", formData);
    // return;

  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('calendar/sc', formData)
        .then(res => {
          const data = Transformer.fetch(res.data);
          if (calendar.calendar_id) {
            dispatch(calendarActions.updateCalendar(data.data));
          }else {
              if(data.status == "success"){
                  dispatch(calendarActions.addNewCalendar(data.data));
              }
          }
          return resolve(data)
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data.errors,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}

export function list() {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get('calendar/lv')
        .then(res => {
          const data = Transformer.fetch(res.data);
          dispatch(calendarActions.calendarList(data.calendars));
          return resolve(data)
        })
        .catch((err) => {
          return reject(err);
        })
    })
  )
}

export function getCalendar(params){
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('calendar/gc', Transformer.send(params))
                .then((res) => {
                    const data = Transformer.fetch(res.data);
                    dispatch(calendarActions.getCalendar(data))
                    return resolve(data)
                })
                .catch((err) => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };

                    if (statusCode === 422) {
                        const resetErrors = {
                            errors: err.response.data.errors,
                            replace: false,
                            searchStr: '',
                            replaceStr: '',
                        };
                        data.error = Transformer.resetValidationFields(resetErrors);
                    } else if (statusCode === 401) {
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}


export function viewCalendar(calendar) {

  const formData = new FormData();

  formData.append('calendar_id', calendar.id);

  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('calendar/vc', formData)
        .then(res => {
          const data = Transformer.fetch(res.data);
          dispatch(calendarActions.setCurrentCalendarEvents(data));
          return resolve(data.events)
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          return reject(data);
        })
    })
  )
}

export function deleteCalendar(calendar) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('calendar/dc', {calendar_id: calendar.id})
        .then(res => {
          const data = Transformer.fetch(res.data);
          dispatch(calendarActions.deleteCalendar(calendar));
          return resolve(data)
        })
        .catch((err) => {
          return reject(err);
        })
    })
  )
}

export function deleteEvent(eventId) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('event/de', {event_id: eventId})
        .then(res => {
          const data = Transformer.fetch(res.data);
          dispatch(calendarActions.deleteEvent(eventId));
          return resolve(data)
        })
        .catch((err) => {
          return reject(err);
        })
    })
  )
}

export function updateEvent(event) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('event/ue', Transformer.send(event))
        .then(res => {
          const data = Transformer.fetch(res.data);
          dispatch(calendarActions.updateEvent(data.data));
          return resolve(data)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  )
}

export function getEventShortLink() {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('event/gel')
        .then(res => {
          const data = Transformer.fetch(res.data);
          dispatch(calendarActions.getEventShortLink(event));
          return resolve(data)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  )
}

export function createEvent(event) {

//   const formData = new FormData();
//
//
//   formData.append('company_id', event.company_id);
//   formData.append('summary', event.summary);
//   formData.append('hash_code', event.hash_code);
//   formData.append('short_link', event.short_link);
//   formData.append('summary', event.summary);
//   formData.append('description', event.description);
//   formData.append('date_from', moment(event.date_from));
//   formData.append('date_to', moment(event.date_to));
//   formData.append('calendar_id', event.calendar_id);
//   if(event.times){
//       formData.append('times', event.times);
//   }
// if(event.units){
//     formData.append('units', event.units);
// }
//
//
//   if (event.event_id) {
//     formData.append('event_id', event.event_id);
//   }
//   console.log("formData", formData);

  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('event/se', event)
        .then(res => {
          const data = Transformer.fetch(res.data);
          if (event.event_id) {
              console.log("update_event");
            dispatch(calendarActions.updateEvent(data.data));
          } else {
              console.log("create_event");
            if(data.status =="success"){
              dispatch(calendarActions.addNewEvent(data.data));
            }
          }
          return resolve(data)
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data.errors,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}
