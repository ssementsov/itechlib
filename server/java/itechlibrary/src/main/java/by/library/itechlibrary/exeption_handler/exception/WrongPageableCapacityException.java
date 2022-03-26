package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongPageableCapacityException extends RuntimeException {

    public WrongPageableCapacityException(String message) {
        super(message);
    }

}
