package by.library.itechlibrary.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UserDto {

    @NotNull
    private long id;

    @NotNull
    private String name;

    private String surname;

    @NotNull
    private String corpEmail;

    private String googleEmail;

}
