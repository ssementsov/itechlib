package by.library.itechlibrary.constant;

import by.library.itechlibrary.entity.BookStatus;

public final class StatusConstant {

    private StatusConstant() {
    }

    public static final String AVAILABLE = "AVAILABLE";
    public static final String NOT_AVAILABLE = "NOT AVAILABLE";
    public static final String IN_USE = "IN USE";
    public static final String AWAITING = "AWAITING";
    public static final String DECLINED = "DECLINED";

    public static final BookStatus AVAILABLE_BOOK_STATUS = new BookStatus((short) 1, AVAILABLE);
    public static final BookStatus NOT_AVAILABLE_BOOK_STATUS = new BookStatus((short) 2, NOT_AVAILABLE);
    public static final BookStatus IN_USE_BOOK_STATUS = new BookStatus((short) 3, IN_USE);
    public static final BookStatus AWAITING_BOOK_STATUS = new BookStatus((short) 4, AWAITING);
    public static final BookStatus DECLINED_BOOK_STATUS = new BookStatus((short) 5, DECLINED);
}