package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class NotActiveBookingException extends RuntimeException {

    public NotActiveBookingException(String message) {
        super(message);
    }

}
