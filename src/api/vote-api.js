import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const VoteAPI = {
    voteSuggestedBook(model) {
        return api.Client.post(`/${EntityTypes.vote}`, model);
    },
};
