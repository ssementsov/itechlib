package by.library.itechlibrary.exeption_handler.exception;

public class WrongBookingStatusException extends RuntimeException{

    public WrongBookingStatusException(String message) {
        super(message);
    }

}
