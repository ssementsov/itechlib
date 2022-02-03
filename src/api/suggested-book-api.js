import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const SuggestionAPI = {
    createSuggestedBook(model) {
        return api.Client.post(`/${EntityTypes.suggestedBooks}`, model);
    },
};
