package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class NecessaryConditionException extends RuntimeException {

    public NecessaryConditionException(String message) {
        super(message);
    }

}
