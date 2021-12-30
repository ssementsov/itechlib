import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BOOKS_ENDPOINT

const getAll = (resource, token) => {
  return axios.get(`${BASE_URL}/${resource}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

const getSingle = (resource, id, token) => {
  return axios.get(`${BASE_URL}/${resource}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

const getGoogle = (resource, id3, params) => {
  return axios.get(`${BASE_URL}/${resource}/${id3}`, {
    params: params,
  })
}

const getAuth = (id4) => {
  return axios.get(`${BASE_URL}/${id4}`)
}

const post = (resource, model) => {
  return axios.post(`${BASE_URL}/${resource}`, model)
}

const postCreds = async (resource, id, model) => {
  return axios.post(`${BASE_URL}/${resource}/${id}`, model)
}

const postCorp = async (resource, id2, model) => {
  return axios.post(`${BASE_URL}/${resource}/${id2}`, null, {
    params: { email: model },
  })
}

const put = (resource, model) => {
  return axios.put(`${BASE_URL}/${resource}`, model)
}

const remove = (resource, id) => {
  return axios.delete(`${BASE_URL}/${resource}/${id}`)
}

export const apiProvider = {
  getAll,
  getSingle,
  getGoogle,
  getAuth,
  post,
  postCreds,
  postCorp,
  put,
  remove,
}
