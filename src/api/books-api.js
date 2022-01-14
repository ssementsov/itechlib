import { api } from './api';
import { booksEntityEndpoint } from '../common/constants/api-constants';

export const actionsWithBooksAPI = {
  getAllBooks() {
    return api.Client.get(`/${booksEntityEndpoint.resource}`);
  },
  getInfoAboutBook(id) {
    return api.Client.get(`/${booksEntityEndpoint.resource}/${id}`);
  },
  addBookToLibrery(model) {
    return api.Client.post(`/${booksEntityEndpoint.resource}`, model);
  },
  changeInfoAboutBook(model) {
    return api.Client.put(`/${booksEntityEndpoint.resource}`, model);
  },
  removeBookFromLibrary(id) {
    return api.Client.delete(`/${booksEntityEndpoint.resource}/${id}`);
  },
};
