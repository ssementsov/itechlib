package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongExtensionFormatException extends RuntimeException {

    public WrongExtensionFormatException(String message) {
        super(message);
    }

}
