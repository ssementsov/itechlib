import { api } from './api';
import { EntityTypes, SortDirection, SortFields } from '../common/constants';

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
    getFeedbacks(
        bookId,
        pageNumber,
        count = 30,
        sortField = SortFields.id,
        sortDirection = SortDirection.asc,
    ) {
        return api.Client.get(`/${EntityTypes.bookings}/feedback`, {
            params: {
                bookId: bookId,
                pageNumber: pageNumber,
                pageCapacity: count,
                sortDirection: sortDirection,
                sortField: sortField,
            },
        });
    },
    getCountActiveBookings(readerId) {
        return api.Client.get(`/${EntityTypes.bookings}/readers/${readerId}/count`);
    },
    updateBookingFinishedDate(bookingId, newFinishDate) {
        return api.Client.put(`/${EntityTypes.bookings}/finish-date?bookingId=${bookingId}&newFinishDate=${newFinishDate}`);
    },
    acceptOrDeclineBooking(requiredFields) {
        return api.Client.post(`/${EntityTypes.bookings}/resolve-assigned`, requiredFields);
    }
};
