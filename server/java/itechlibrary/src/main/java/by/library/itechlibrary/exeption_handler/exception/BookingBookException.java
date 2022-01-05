package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class BookingBookException extends RuntimeException {

    public BookingBookException(String message) {
        super(message);
    }

}
