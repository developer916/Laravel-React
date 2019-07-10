import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'

import * as publicActions from './store/actions'

let hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function listPublicCalendars(searchForm) {
    console.log("searchForm", searchForm);
  // return dispatch => {
  //   let url = 'dashboard/pc';
  //   if (!isEmpty(credentials) && credentials.search !== '') {
  //     url = url + `?search=${credentials.search}`
  //   }
  //   Http.get(url)
  //     .then(res => {
  //       const data = transformResponse(res.data);
  //       dispatch(publicActions.listPublicCalendars(data))
  //     })
  //     .catch((err) => {
  //       console.error(err.response)
  //     })
  // }

    return dispatch =>(
        new Promise((resolve, reject) => {
            Http.post('dashboard/pc', transformRequest(searchForm))
                .then(res => {
                    const data = transformResponse(res.data);
                    console.log(data);
                    dispatch(publicActions.listPublicCalendars(data))
                    return resolve(data)
                })
                .catch((err) => {
                    return reject(err);
                })
        })
    );
}


export function getCalendarDetail(hashCode) {
  let params = {
    hashCode: hashCode
  }
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('dashboard/vc', transformRequest(params))
                .then(res => {
                    const data = transformResponse(res.data);
                    console.log(data);
                    dispatch(publicActions.publicDetailOfCalendar(data))
                    return resolve(data)
                })
                .catch((err) => {
                    return reject(err);
                })
        })
    )
}
export function getPublicIp(){
        return dispatch => (
        new Promise((resolve, reject) => {
            Http.get('https://ipinfo.io?token='+'953c3a7619af6b')
            // Http.post('https://geoip-db.com/json/')
                .then(res => {
                    const data = Transformer.fetch(res.data);
                    return resolve(data)
                })
                .catch((err) => {
                    return reject(err);
                })
        })
    )
}

export function subscribeCalendar(uuid, calendarId, publicIp="") {
  let params = {
    uuid: uuid,
    calendarId: calendarId,
    publicIp : publicIp
  }

  return dispatch => {
    Http.post('dashboard/an', transformRequest(params))
      .then(res => {
      })
      .catch((err) => {
        console.error(err.response)
      })
  }
}

export function getEventByHashCode(params) {
  return dispatch => {
    Http.post('dashboard/gebh', transformRequest(params))
      .then(res => {
        const data = transformResponse(res.data);
        dispatch(publicActions.publicViewEvent(transformResponse(data.data)))
      })
      .catch((err) => {
        console.error(err.response)
      })
  }
}

export function getCategories() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get('dashboard/gca')
                .then(res => {
                    const data = Transformer.fetch(res.data);
                    console.log("categories_data", data);
                    dispatch(publicActions.publicCategories(data));
                    return resolve(data)
                })
                .catch((err) => {
                    return reject(err);
                })
        })
    )
}



export function submitSubscriber(params) {

  return dispatch => (
      new Promise((resolve, reject) => {
          Http.post('dashboard/ss', transformRequest(params))
              .then(res => {
                  const data = transformResponse(res.data);
                  console.log(data);
                  dispatch(publicActions.publicRegisterSubscriber(transformResponse(data.data)))
                  return resolve(data)
              })
              .catch((err) => {
                  console.error(err)
              })
      })
  )
}
