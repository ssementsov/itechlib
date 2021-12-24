package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongDateException extends RuntimeException {

    public WrongDateException(String message) {
        super(message);
    }

}
