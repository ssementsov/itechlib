import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';
import { SortDirection, SortFields } from '../common/constants/sorting-constants';

export const SuggestionAPI = {
    createSuggestedBook(model) {
        return api.Client.post(`/${EntityTypes.suggestedBooks}`, model);
    },
    getSuggestedBooksList(
        requestFieldsForSorting,
        pageNumber,
        count = 9,
        sortField = SortFields.createDate,
        sortDirection = SortDirection.desc
    ) {
        const filters = requestFieldsForSorting.length ? requestFieldsForSorting : null;
        return api.Client.post(`/${EntityTypes.suggestedBooks}/all`, filters, {
            params: {
                pageNumber: pageNumber,
                pageCapacity: count,
                sortDirection: sortDirection,
                sortField: sortField,
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
