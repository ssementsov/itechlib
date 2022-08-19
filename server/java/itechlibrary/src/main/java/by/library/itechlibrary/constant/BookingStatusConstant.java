package by.library.itechlibrary.constant;

import by.library.itechlibrary.entity.BookingStatus;

public class BookingStatusConstant {

    private BookingStatusConstant() {
    }

    public static final String ACCEPTED = "ACCEPTED";
    public static final String DECLINED = "DECLINED";
    public static final String AWAITING_CONFIRMATION = "AWAITING CONFIRMATION";
    public static final String NOT_REQUIRE_CONFIRMATION = "NOT REQUIRE CONFIRMATION";


    public static final BookingStatus ACCEPTED_BOOKING_STATUS = new BookingStatus((short) 1, ACCEPTED);
    public static final BookingStatus DECLINED_BOOKING_STATUS = new BookingStatus((short) 2, DECLINED);
    public static final BookingStatus AWAITING_CONFIRMATION_BOOKING_STATUS = new BookingStatus((short) 3, AWAITING_CONFIRMATION);
    public static final BookingStatus NOT_REQUIRE_CONFIRMATION_BOOKING_STATUS = new BookingStatus((short) 4, NOT_REQUIRE_CONFIRMATION);
}