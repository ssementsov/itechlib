package by.library.itechlibrary.exeption_handler.exception;

import lombok.Data;

@Data
public class NotFoundSuggestedBookVoteCounterException extends RuntimeException {

    public NotFoundSuggestedBookVoteCounterException(String message) {
        super(message);
    }

}
