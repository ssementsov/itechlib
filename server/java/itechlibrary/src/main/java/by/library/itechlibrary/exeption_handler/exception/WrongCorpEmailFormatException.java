package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongCorpEmailFormatException extends RuntimeException {

    public WrongCorpEmailFormatException(String message) {
        super(message);
    }

}
