package by.library.itechlibrary.exeption_handler;


import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongGoogleEmailException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<IncorrectData> handleException(NotFoundException exception) {

      IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(WrongGoogleEmailException.class)
    public ResponseEntity<IncorrectData> handleException(WrongGoogleEmailException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    private IncorrectData incorrectDataFilling(Exception exception) {

       IncorrectData incorrectData = new IncorrectData();
        log.error("Message: {} Error UUID code: {}", exception.getMessage(), incorrectData.getErrorCode());
        exception.printStackTrace();
        incorrectData.setMessage(exception.getMessage());

        return incorrectData;
    }
}