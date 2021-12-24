import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BOOKS_ENDPOINT;

const getAll = (resource) => {
  return axios.get(`${BASE_URL}/${resource}`);
};

const getSingle = (resource, id) => {
  return axios.get(`${BASE_URL}/${resource}/${id}`);
};

const post = (resource, model) => {
  return axios.post(`${BASE_URL}/${resource}`, model);
};

const put = (resource, model) => {
  return axios.put(`${BASE_URL}/${resource}`, model);
};

const remove = (resource, id) => {
  return axios.delete(`${BASE_URL}/${resource}/${id}`);
};

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  remove,
};
