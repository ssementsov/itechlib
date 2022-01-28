import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const UserAPI = {
    checkCorpEmail(model) {
        return api.Client.post(`/${EntityTypes.users}/check/corp-email`, null, {
            params: { email: model },
        });
    },

    connectGoogleEmail(model) {
        return api.Client.post(`/${EntityTypes.users}/check`, model);
    },

    confirmRegistration(params) {
        return api.Client.get(`/${EntityTypes.users}/confirm/google`, {
            params: params,
        });
    },

    auth(bodyGoogle) {
        return api.Client.post(`/${EntityTypes.auth}`, bodyGoogle);
    },

    getUser() {
        return api.Client.get(`/${EntityTypes.users}/current-user`);
    },

    addAvatar(model) {
        return api.Client.post(`/${EntityTypes.users}/attach-photo`, model, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
    },

    deleteAvatar(id) {
        return api.Client.delete(`/${EntityTypes.users}/${id}/removed-photo`);
    },
};
