import { fetchAccepetedPoemsApi } from "../../utils/api";
export const FETCH_POEMS = "FETCH_POEMS";

export const fetchAcceptedPoems = (page = 1) => {
  return dispatch => {
    return fetchAccepetedPoemsApi(page).then(res => {
      dispatch(fetchAcceptedPoemsSuccess(res.data));
    });
  };
};

export function fetchAcceptedPoemsSuccess(poems) {
  return {
    type: FETCH_POEMS,
    poems
  };
}
