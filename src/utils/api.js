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

export function fetchNotAcceptedApi(page) {
  return axios.get(`${apiUrl}/accept/poems/${page}`);
}

export function createPoem(data) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return axios.post(`${apiUrl}/create/poem`, data, config);
}

export function acceptPoemApi(id) {
  return axios.post(`${apiUrl}/accept/poem/${id}`);
}

export function deletePoemApi(id) {
  return axios.post(`${apiUrl}/delete/poem/${id}`);
}

export function createEvent(data) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return axios.post(`${apiUrl}/create/event`, data, config);
}

export function deleteEventApi(id) {
  return axios.post(`${apiUrl}/delete/event/${id}`);
}

export function fetchEventsApi(page) {
  return axios(`${apiUrl}/events/${page}`);
}

export function auth(data) {
  const login = {
    email: data.email,
    password: data.password
  };
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  };
  return axios.post(`${apiUrl}/admin/auth`, login, config);
}

export function checkAuth(token) {
  const data = { token: token };
  const config = {
    headers: { Authorization: "bearer " + token }
  };
  return axios.get(`${apiUrl}/admin/check-token?token=${token}`, data, config);
}
