import { api } from './api';
import { bookingsEntityEndpont } from '../common/constants/api-constants';

export const actionsWithBookingsAPI = {
  createNewBooking(model) {
    return api.Client.post(`/${bookingsEntityEndpont.resource}`, model);
  },
  getCurrentBookingOfBook(params) {
    return api.Client.get(`/${bookingsEntityEndpont.resource}`, {
      params: params,
    });
  },
  cancelBooking(id, feedback) {
    return api.Client.post(
      `/${bookingsEntityEndpont.resource}/${id}/${bookingsEntityEndpont.urlCancelBooking}`,
      feedback
    );
  },
};
