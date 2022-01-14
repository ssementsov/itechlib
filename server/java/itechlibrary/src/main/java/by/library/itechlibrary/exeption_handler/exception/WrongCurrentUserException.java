package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongCurrentUserException extends RuntimeException {

    public WrongCurrentUserException(String message) {
        super(message);
    }

}
