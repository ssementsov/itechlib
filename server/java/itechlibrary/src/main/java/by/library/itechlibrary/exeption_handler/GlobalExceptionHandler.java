package by.library.itechlibrary.exeption_handler;


import by.library.itechlibrary.exeption_handler.exception.*;
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

    @ExceptionHandler(WrongDtoDataException.class)
    public ResponseEntity<IncorrectData> handleException(WrongDtoDataException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongBookStatusException.class)
    public ResponseEntity<IncorrectData> handleException(WrongBookStatusException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongDateException.class)
    public ResponseEntity<IncorrectData> handleException(WrongDateException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongConfirmationCodeException.class)
    public ResponseEntity<IncorrectData> handleException(WrongConfirmationCodeException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotActivatedUserException.class)
    public ResponseEntity<IncorrectData> handleException(NotActivatedUserException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BookingBookException.class)
    public ResponseEntity<IncorrectData> handleException(BookingBookException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NecessaryConditionException.class)
    public ResponseEntity<IncorrectData> handleException(NecessaryConditionException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotActiveBookingException.class)
    public ResponseEntity<IncorrectData> handleException(NotActiveBookingException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongCorpEmailFormatException.class)
    public ResponseEntity<IncorrectData> handleException(WrongCorpEmailFormatException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongCurrentUserException.class)
    public ResponseEntity<IncorrectData> handleException(WrongCurrentUserException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UploadFileException.class)
    public ResponseEntity<IncorrectData> handleException(UploadFileException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongExtensionFormatException.class)
    public ResponseEntity<IncorrectData> handleException(WrongExtensionFormatException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongUserPhotoIdException.class)
    public ResponseEntity<IncorrectData> handleException(WrongUserPhotoIdException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotNewObjectException.class)
    public ResponseEntity<IncorrectData> handleException(NotNewObjectException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongVoteException.class)
    public ResponseEntity<IncorrectData> handleException(WrongVoteException exception) {

        IncorrectData incorrectData = incorrectDataFilling(exception);

        return new ResponseEntity<>(incorrectData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongPageableCapacityException.class)
    public ResponseEntity<IncorrectData> handleException(WrongPageableCapacityException exception) {

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