package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongGoogleEmailException extends RuntimeException {

    public WrongGoogleEmailException(String message) {
        super(message);
    }

}
