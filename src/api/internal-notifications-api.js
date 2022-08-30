import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const InternalNotificationsAPI = {
    getInternalNotificationsList(userId) {
        return api.Client.get(`/${EntityTypes.internalNotifications}/user/${userId}`)
    },
};