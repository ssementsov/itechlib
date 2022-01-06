import { apiProvider } from './provider';

export class ApiCore {
  constructor(options) {
    //BOOKS
    if (options.getAll) {
      this.getAll = (token) => {
        return apiProvider.getAll(options.url, token);
      };
    }

    if (options.getSingle) {
      this.getSingle = (id, token) => {
        return apiProvider.getSingle(options.url, id, token);
      };
    }

    if (options.post) {
      this.post = (model, token) => {
        return apiProvider.post(options.url, model, token);
      };
    }

    if (options.put) {
      this.put = (model, token) => {
        return apiProvider.put(options.url, model, token);
      };
    }

    if (options.remove) {
      this.remove = (id, token) => {
        return apiProvider.remove(options.url, id, token);
      };
    }

    //USER
    if (options.getGoogle) {
      this.getGoogle = (params) => {
        return apiProvider.getGoogle(options.url, options.id3, params);
      };
    }
    if (options.postAuth) {
      this.postAuth = (bodyGoogle) => {
        return apiProvider.postAuth(options.id4, bodyGoogle);
      };
    }

    if (options.postCreds) {
      this.postCreds = (model) => {
        return apiProvider.postCreds(options.url, options.id2, model);
      };
    }

    if (options.postCorp) {
      this.postCorp = (model) => {
        return apiProvider.postCorp(options.url, options.id, model);
      };
    }

    //BOOKINGS
    if (options.postBooking) {
      this.postBooking = (model, token) => {
        return apiProvider.postBooking(options.url, model, token);
      };
    }
  }
}
