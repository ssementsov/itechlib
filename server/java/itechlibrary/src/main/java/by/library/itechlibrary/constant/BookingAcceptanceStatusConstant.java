package by.library.itechlibrary.constant;

import by.library.itechlibrary.entity.BookingAcceptanceStatus;

public class BookingAcceptanceStatusConstant {

    private BookingAcceptanceStatusConstant() {
    }

    public static final String ACCEPTED = "ACCEPTED";
    public static final String DECLINED = "DECLINED";

    public static final BookingAcceptanceStatus ACCEPTED_BOOKING_ACCEPTANCE_STATUS = new BookingAcceptanceStatus((short) 1, ACCEPTED);
    public static final BookingAcceptanceStatus DECLINED_BOOKING_ACCEPTANCE_STATUS = new BookingAcceptanceStatus((short) 2, DECLINED);
}