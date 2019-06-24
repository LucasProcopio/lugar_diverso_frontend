import { fetchAboutApi, fetchContactApi } from "../../utils/api";
export const FETCH_ABOUT = "FETCH_ABOUT";
export const FETCH_CONTACT = "FETCH_CONTACT";
export const NETWORK_ERROR = "NETWORK_ERROR";

export const fetchAbout = () => {
  return dispatch => {
    return fetchAboutApi()
      .then(response => {
        dispatch(fetchAboutSuccess(response.data));
      })
      .catch(err => {
        // create a function helper to haandle multiple status errors
        if (!err.status) {
          const error = "Servidor indisponível";
          dispatch(netWorkError(error));
        }
      });
  };
};

export function fetchAboutSuccess(about) {
  return {
    type: FETCH_ABOUT,
    about
  };
}

export function netWorkError(error) {
  return {
    type: NETWORK_ERROR,
    error
  };
}

export const fecthContacts = () => {
  return dispatch => {
    return fetchContactApi()
      .then(response => {
        dispatch(fetchContactSuccess(response.data));
      })
      .catch(err => {
        if (!err.status) {
          const error = "Servidor indisponível";
          dispatch(netWorkError(error));
        }
      });
  };
};

export function fetchContactSuccess(contact) {
  return {
    type: FETCH_CONTACT,
    contact
  };
}
