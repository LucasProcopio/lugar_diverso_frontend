import { fetchAboutApi, fetchContactApi } from "../../utils/api";
export const FETCH_ABOUT = "FETCH_ABOUT";
export const FETCH_CONTACT = "FETCH_CONTACT";

export const fetchAbout = () => {
  return dispatch => {
    return fetchAboutApi()
      .then(response => {
        dispatch(fetchAboutSuccess(response.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export function fetchAboutSuccess(about) {
  return {
    type: FETCH_ABOUT,
    about
  };
}

export const fecthContacts = () => {
  return dispatch => {
    return fetchContactApi().then(response => {
      dispatch(fetchContactSuccess(response.data));
    });
  };
};

export function fetchContactSuccess(contact) {
  return {
    type: FETCH_CONTACT,
    contact
  };
}
