import { api } from './api';
import { EntityTypes, SortDirection, SortFields } from '../common/constants';

export const BooksAPI = {
    getAllBooks(
        pageNumber,
        count = 15,
        sortField = SortFields.createDate,
        sortDirection = SortDirection.desc
    ) {
        return api.Client.get(`/${EntityTypes.books}`, {
            params: {
                pageNumber: pageNumber,
                pageCapacity: count,
                sortDirection: sortDirection,
                sortField: sortField
            },
        });
    },
    getBookInfo(id) {
        return api.Client.get(`/${EntityTypes.books}/${id}`);
    },
    addBook(model) {
        return api.Client.post(`/${EntityTypes.books}`, model, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
    },
    changeBookInfo(model) {
        return api.Client.put(`/${EntityTypes.books}`, model);
    },
    removeBook(id) {
        return api.Client.delete(`/${EntityTypes.books}/${id}`);
    },
    getOwnerBooks(
        pageNumber,
        count = 15,
        sortField = SortFields.createDate,
        sortDirection = SortDirection.desc
    ) {
        return api.Client.get(`/${EntityTypes.books}/users/`, {
            params: {
                pageNumber: pageNumber,
                pageCapacity: count,
                sortDirection: sortDirection,
                sortField: sortField
            },
        });
    },
    getBooksInUse() {
        return api.Client.get(`/${EntityTypes.books}/users/bookings`);
    },
    addBookCover(model) {
        return api.Client.put(`/${EntityTypes.books}/photo`, model, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
    },
    deleteBookCover(id) {
        return api.Client.delete(`/${EntityTypes.books}/${id}/photo`);
    },
};
