import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BOOKS_ENDPOINT;

//BOOKS
const getAll = (resource, token) => {
  return axios.get(`${BASE_URL}/${resource}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getSingle = (resource, id, token) => {
  return axios.get(`${BASE_URL}/${resource}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const post = (resource, model, token) => {
  return axios.post(`${BASE_URL}/${resource}`, model, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const put = (resource, model, token) => {
  return axios.put(`${BASE_URL}/${resource}`, model, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const remove = (resource, id, token) => {
  return axios.delete(`${BASE_URL}/${resource}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//USER
const getGoogle = (resource, id3, params) => {
  return axios.get(`${BASE_URL}/${resource}/${id3}`, {
    params: params,
  });
};

const postAuth = (id4, bodyGoogle) => {
  return axios.post(`${BASE_URL}/${id4}`, bodyGoogle);
};

const postCreds = async (resource, id, model) => {
  return axios.post(`${BASE_URL}/${resource}/${id}`, model);
};

const postCorp = async (resource, id2, model) => {
  return axios.post(`${BASE_URL}/${resource}/${id2}`, null, {
    params: { email: model },
  });
};

//BOOKINGS
const postBooking = (resource, model, token) => {
  return axios.post(`${BASE_URL}/${resource}`, model, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getCurrentBookingsOfReader = (resource, urlCurrent, id, token) => {
  return axios.get(`${BASE_URL}/${resource}/${id}/${urlCurrent}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  remove,
  getGoogle,
  postAuth,
  postCreds,
  postCorp,
  postBooking,
  getCurrentBookingsOfReader,
};
