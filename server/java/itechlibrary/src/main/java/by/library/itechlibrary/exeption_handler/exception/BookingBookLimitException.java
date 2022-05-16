package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class BookingBookLimitException extends RuntimeException {

    public BookingBookLimitException(String message) {
        super(message);
    }

}
