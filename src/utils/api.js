import axios from "axios";

const apiUrl = "http://localhost:4000";

export function fetchAboutApi() {
  return axios.get(`${apiUrl}/about`);
}

export function fetchContactApi() {
  return axios.get(`${apiUrl}/contact`);
}
