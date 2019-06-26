import {
  fetchAccepetedPoemsApi,
  fetchNotAcceptedApi,
  acceptPoemApi,
  deletePoemApi
} from "../../utils/api";
import { netWorkError } from "../home/homeAction";
export const FETCH_POEMS = "FETCH_POEMS";
export const FETCH_NOT_ACCEPTED = "FETCH_NOT_ACCEPTED";
export const ACCEPT_POEM = "ACCEPT_POEM";
export const DELETE_POEM = "DELETE_POEM";

export const fetchAcceptedPoems = (page = 1) => {
  return dispatch => {
    return fetchAccepetedPoemsApi(page)
      .then(res => {
        dispatch(fetchAcceptedPoemsSuccess(res.data));
      })
      .catch(err => {
        if (!err.status) {
          const error = "Servidor indisponível";
          dispatch(netWorkError(error));
        }
      });
  };
};

export const fetchNotAccepted = (page = 1) => {
  return dispatch => {
    return fetchNotAcceptedApi(page)
      .then(res => {
        dispatch(fetchNotAcceptedSuccess(res.data));
      })
      .catch(err => {
        if (!err.status) {
          const error = "Servidor indisponível";
          dispatch(netWorkError(error));
        }
      });
  };
};

export const acceptPoem = id => {
  return dispatch => {
    return acceptPoemApi(id).then(res => {
      dispatch(acceptPoemSuccess(id));
    });
  };
};

export const deletePoem = id => {
  return dispatch => {
    return deletePoemApi(id).then(res => {
      dispatch(deletePoemSuccess(id));
    });
  };
};

export function fetchAcceptedPoemsSuccess(poems) {
  return {
    type: FETCH_POEMS,
    poems
  };
}

export function fetchNotAcceptedSuccess(poems) {
  return {
    type: FETCH_NOT_ACCEPTED,
    poems
  };
}

export function deletePoemSuccess(poem) {
  return {
    type: DELETE_POEM,
    poem
  };
}

export function acceptPoemSuccess(poem) {
  return {
    type: ACCEPT_POEM,
    poem
  };
}
