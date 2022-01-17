import axios from 'axios';

class Api {
  constructor() {
    let client = axios.create();
    const BASE_URL = process.env.NEXT_PUBLIC_BOOKS_ENDPOINT;
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
