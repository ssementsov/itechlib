package by.library.itechlibrary.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class EmailCheckerDto {

    @NotNull
    private String corpEmail;

    @NotNull
    private String googleEmail;

}
