import { fetchEventsApi, deleteEventApi } from "../../utils/api";
export const FETCH_EVENTS = "FETCH_EVENTS";
export const DELETE_EVENT = "DELETE_EVENT";

export const fetchEvents = page => {
  return dispatch => {
    return fetchEventsApi(page).then(res => {
      dispatch(fetchEventSuccess(res.data));
    });
  };
};

export const deleteEvent = id => {
  return dispatch => {
    return deleteEventApi(id).then(res => {
      dispatch(deleteEventSuccess(id));
    });
  };
};

export function fetchEventSuccess(events) {
  return {
    type: FETCH_EVENTS,
    events
  };
}

export function deleteEventSuccess(event) {
  return {
    type: DELETE_EVENT,
    event
  };
}
