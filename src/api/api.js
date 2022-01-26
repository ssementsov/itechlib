import axios from 'axios';

class Api {
  constructor() {
    let client = axios.create();
    const BASE_URL = 'http://localhost:8089/api';
    client.defaults.baseURL = BASE_URL;
    this.Client = client;
  }

  setupAuth(token) {
    this.Client.defaults.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
}

export const api = new Api();
