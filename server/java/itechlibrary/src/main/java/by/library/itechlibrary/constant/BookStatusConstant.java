package by.library.itechlibrary.constant;

import by.library.itechlibrary.entity.BookStatus;

public final class BookStatusConstant {

    private BookStatusConstant() {
    }

    public static final String AVAILABLE = "AVAILABLE";
    public static final String NOT_AVAILABLE = "NOT AVAILABLE";
    public static final String IN_USE = "IN USE";
    public static final String ACCEPTANCE_AWAITING = "ACCEPTANCE AWAITING";
    public static final String ACCEPTANCE_DECLINED = "ACCEPTANCE DECLINED";

    public static final BookStatus AVAILABLE_BOOK_STATUS = new BookStatus((short) 1, AVAILABLE);
    public static final BookStatus NOT_AVAILABLE_BOOK_STATUS = new BookStatus((short) 2, NOT_AVAILABLE);
    public static final BookStatus IN_USE_BOOK_STATUS = new BookStatus((short) 3, IN_USE);
    public static final BookStatus ACCEPTANCE_AWAITING_BOOK_STATUS = new BookStatus((short) 4, ACCEPTANCE_AWAITING);
    public static final BookStatus ACCEPTANCE_DECLINED_BOOK_STATUS = new BookStatus((short) 5, ACCEPTANCE_DECLINED);
}