export const FETCH_ADM_TOKEN = "FETCH_ADM_TOKEN";
export const FETCH_ADM_DATA = "FETCH_ADM_DATA";

export function fetchAdmToken(token) {
  return {
    type: FETCH_ADM_TOKEN,
    token
  };
}

export function fetchAdmData(data) {
  return {
    type: FETCH_ADM_DATA,
    data
  };
}
