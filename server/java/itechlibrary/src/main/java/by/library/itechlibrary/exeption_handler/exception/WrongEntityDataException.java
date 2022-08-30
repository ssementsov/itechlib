package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongEntityDataException extends RuntimeException{

    public WrongEntityDataException(String message) {
        super(message);
    }

}
