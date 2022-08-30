package by.library.itechlibrary.constant;

import by.library.itechlibrary.entity.BookStatus;

public class BookingStatusConstant {

    private BookingStatusConstant() {
    }

    public static final String ACCEPTED = "ACCEPTED";
    public static final String DECLINED = "DECLINED";
    public static final String AWAITING_CONFIRMATION = "AWAITING CONFIRMATION";
    public static final String NOT_REQUIRE_CONFIRMATION = "NOT REQUIRE CONFIRMATION";

    public static final BookStatus ACCEPTED_BOOKING_STATUS = new BookStatus((short) 1, ACCEPTED);
    public static final BookStatus DECLINED_BOOKING_STATUS = new BookStatus((short) 2, DECLINED);
    public static final BookStatus AWAITING_CONFIRMATION_BOOKING_STATUS = new BookStatus((short) 3, AWAITING_CONFIRMATION);
    public static final BookStatus NOT_REQUIRE_CONFIRMATION_BOOKING_STATUS = new BookStatus((short) 4, NOT_REQUIRE_CONFIRMATION);
}
