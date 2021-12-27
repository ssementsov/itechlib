package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongConfirmationCodeException extends RuntimeException {

    public WrongConfirmationCodeException(String message) {
        super(message);
    }

}
