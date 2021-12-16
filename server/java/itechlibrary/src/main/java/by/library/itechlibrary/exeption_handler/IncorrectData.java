package by.library.itechlibrary.exeption_handler;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class IncorrectData {

    private String message;

    private String codeException;

    private UUID errorCode;

    public IncorrectData() {
        this.errorCode = UUID.randomUUID();
    }
}