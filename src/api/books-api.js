import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const BooksAPI = {
  getAllBooks() {
    return api.Client.get(`/${EntityTypes.books}`);
  },
  getBookInfo(id) {
    return api.Client.get(`/${EntityTypes.books}/${id}`);
  },
  addBook(model) {
    return api.Client.post(`/${EntityTypes.books}`, model);
  },
  changeBookInfo(model) {
    return api.Client.put(`/${EntityTypes.books}`, model);
  },
  removeBook(id) {
    return api.Client.delete(`/${EntityTypes.books}/${id}`);
  },
};
