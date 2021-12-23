package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongDtoDataException extends RuntimeException {

    public WrongDtoDataException(String message) {
        super(message);
    }

}
