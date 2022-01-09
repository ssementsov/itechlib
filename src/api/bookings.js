import { ApiCore } from './utilities/core';

const urlBookings = 'bookings';
const urlCurrent = 'current';

export const apiBookings = new ApiCore({
  postBooking: true,
  getCurrentBookingsOfReader: true,
  url: urlBookings,
  urlCurrent: urlCurrent,
});
