package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class NotActivatedUserException extends RuntimeException {

    public NotActivatedUserException(String message) {
        super(message);
    }

}
