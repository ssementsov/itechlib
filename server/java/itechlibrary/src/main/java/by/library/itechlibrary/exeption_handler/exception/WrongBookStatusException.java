package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongBookStatusException extends RuntimeException {

    public WrongBookStatusException(String message) {
        super(message);
    }

}
