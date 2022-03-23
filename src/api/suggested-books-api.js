import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const SuggestionAPI = {
    createSuggestedBook(model) {
        return api.Client.post(`/${EntityTypes.suggestedBooks}`, model);
    },

    getSuggestedBooksList() {
        return api.Client.get(`/${EntityTypes.suggestedBooks}`);
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
