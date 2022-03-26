package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class WrongVoteException extends RuntimeException {

    public WrongVoteException(String message) {
        super(message);
    }

}
