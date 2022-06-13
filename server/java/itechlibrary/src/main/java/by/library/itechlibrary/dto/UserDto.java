package by.library.itechlibrary.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserDto {

    @NotNull
    private long id;

    @NotNull
    private String name;

    private String surname;

    @Email(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@itechart-group.com", message = "Wrong corp mail")
    @Size(min = 24, max = 50)
    @NotNull
    private String corpEmail;

    @Email(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@gmail.com", message = "Wrong google mail")
    @Size(min = 24, max = 50)
    private String googleEmail;

}
