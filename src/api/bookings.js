import { ApiCore } from './utilities/core';

const urlBookings = 'bookings';

export const apiBookings = new ApiCore({
  postBooking: true,
  url: urlBookings,
});
