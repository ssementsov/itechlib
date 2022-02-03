package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class NotNewObjectException extends RuntimeException {

    public NotNewObjectException(String message) {
        super(message);
    }

}
