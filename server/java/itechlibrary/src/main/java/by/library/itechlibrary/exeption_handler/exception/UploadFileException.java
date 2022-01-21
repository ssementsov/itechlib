package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class UploadFileException extends RuntimeException {

    public UploadFileException(String message) {
        super(message);
    }

}
