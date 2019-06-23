export const FETCH_ADM_TOKEN = "FETCH_ADM_TOKEN";

export function fetchAdmToken(token) {
  return {
    type: FETCH_ADM_TOKEN,
    token
  };
}
