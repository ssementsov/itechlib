import { api } from './api';
import { EntityTypes } from '../common/constants/api-constants';

export const BookingsAPI = {
    createBooking(model) {
        return api.Client.post(`/${EntityTypes.bookings}`, model);
    },
    getCurrentBooking(params) {
        return api.Client.get(`/${EntityTypes.bookings}`, {
            params: params,
        });
    },
    cancelBooking(id, feedback) {
        return api.Client.post(`/${EntityTypes.bookings}/${id}/return`, feedback);
    },
    getFeedbacks(pageNumber, count, bookId) {
        return api.Client.get(`/${EntityTypes.bookings}/feedback`, {
            params: {
                bookId: bookId,
                pageNumber: pageNumber,
                pageCapacity: count,
            },
        });
    },
    getCountActiveBookings(readerId) {
        return api.Client.get(`/${EntityTypes.bookings}/readers/${readerId}/count`)
    },
};
