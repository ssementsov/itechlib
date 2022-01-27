package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongUserPhotoIdException extends RuntimeException {

    public WrongUserPhotoIdException(String message) {
        super(message);
    }

}
