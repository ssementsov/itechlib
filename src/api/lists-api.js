import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const ListsAPI = {
    getUsersList() {
        return api.Client.get(`/${EntityTypes.users}/all-active`);
    },
};