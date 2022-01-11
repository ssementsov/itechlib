import { apiProvider } from "./provider";

export class ApiCore {
  constructor(options) {
    //BOOKS
    if (options.getAll) {
      this.getAll = () => {
        return apiProvider.getAll(options.url);
      };
    }

    if (options.getSingle) {
      this.getSingle = (id) => {
        return apiProvider.getSingle(options.url, id);
      };
    }

    if (options.post) {
      this.post = (model) => {
        return apiProvider.post(options.url, model);
      };
    }

    if (options.put) {
      this.put = (model) => {
        return apiProvider.put(options.url, model);
      };
    }

    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(options.url, id);
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
      this.postBooking = (model) => {
        return apiProvider.postBooking(options.url, model);
      };
    }

    if (options.getCurrentBookingsOfReader) {
      this.getCurrentBookingsOfReader = (id) => {
        return apiProvider.getCurrentBookingsOfReader(
          options.url,
          options.urlCurrent,
          id
        );
      };
    }
  }
}
