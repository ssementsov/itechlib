import { api } from "./api";

//BOOKS
const getAll = (resource) => {
  return api.Client.get(`/${resource}`);
};

const getSingle = (resource, id) => {
  return api.Client.get(`/${resource}/${id}`);
};

const post = (resource, model) => {
  return api.Client.post(`/${resource}`, model);
};

const put = (resource, model) => {
  return api.Client.put(`/${resource}`, model);
};

const remove = (resource, id) => {
  return api.Client.delete(`/${resource}/${id}`);
};

//USER
const getGoogle = (resource, id3, params) => {
  return api.Client.get(`/${resource}/${id3}`, {
    params: params,
  });
};

const postAuth = (id4, bodyGoogle) => {
  return api.Client.post(`/${id4}`, bodyGoogle);
};

const postCreds = async (resource, id, model) => {
  return api.Client.post(`/${resource}/${id}`, model);
};

const postCorp = async (resource, id2, model) => {
  return api.Client.post(`/${resource}/${id2}`, null, {
    params: { email: model },
  });
};

//BOOKINGS
const postBooking = (resource, model) => {
  return api.Client.post(`/${resource}`, model);
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
};
