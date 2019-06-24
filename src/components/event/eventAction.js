import { fetchEventsApi } from "../../utils/api";
export const FETCH_EVENTS = "FETCH_EVENTS";

export const fetchEvents = page => {
  return dispatch => {
    return fetchEventsApi(page).then(res => {
      dispatch(fetchEventSuccess(res.data));
    });
  };
};

export function fetchEventSuccess(events) {
  return {
    type: FETCH_EVENTS,
    events
  };
}
