import axios from "axios";

const apiUrl = "http://localhost:4000";

export function fetchAboutApi() {
  return axios.get(`${apiUrl}/about`);
}

export function fetchContactApi() {
  return axios.get(`${apiUrl}/contact`);
}

export function fetchAccepetedPoemsApi(page) {
  return axios.get(`${apiUrl}/poems/${page}`);
}

export function createPoem(data) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return axios.post(`${apiUrl}/create/poem`, data, config);
}
