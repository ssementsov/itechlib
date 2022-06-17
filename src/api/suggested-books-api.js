import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const SuggestionAPI = {
    createSuggestedBook(model) {
        return api.Client.post(`/${EntityTypes.suggestedBooks}`, model);
    },
    getSuggestedBooksList(
        requestFieldsForFiltering,
        requestFieldsForSorting,
        pageNumber = 0,
        count = 9,
    ) {
        const filters = requestFieldsForFiltering.length ? requestFieldsForFiltering : null;
        return api.Client.post(`/${EntityTypes.suggestedBooks}/all`, filters, {
            params: {
                pageNumber: pageNumber,
                pageCapacity: count,
                sortDirection: requestFieldsForSorting.sortDirection,
                sortField: requestFieldsForSorting.sortField,
            },
        });
    },
    getSuggestedBook(bookId) {
        return api.Client.get(`/${EntityTypes.suggestedBooks}/${bookId}`);
    },
    changeBookInfo(model) {
        return api.Client.put(`/${EntityTypes.suggestedBooks}`, model);
    },
    removeBook(id) {
        return api.Client.delete(`/${EntityTypes.suggestedBooks}/${id}`);
    },
};
