import { ApiCore } from "./utilities/core";

const urlBookings = "bookings";
const urlCancelBooking = "return";

export const apiBookings = new ApiCore({
  postBooking: true,
  getBooking: true,
  cancelBooking: true,
  url: urlBookings,
  urlCancelBooking: urlCancelBooking,
});
