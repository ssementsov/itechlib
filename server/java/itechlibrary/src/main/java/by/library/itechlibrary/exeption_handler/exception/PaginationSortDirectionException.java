package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class PaginationSortDirectionException extends RuntimeException {

    public PaginationSortDirectionException(String message) {
        super(message);
    }

}
