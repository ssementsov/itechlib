package by.library.itechlibrary.dto;

import by.library.itechlibrary.constant.RegexConstant;
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

    @Email(regexp = RegexConstant.USER_CORP_EMAIL_REGEX, message = "Wrong corp mail")
    @Size(min = 24, max = 50)
    @NotNull
    private String corpEmail;

    @Email(regexp = RegexConstant.USER_GOOGLE_EMAIL_REGEX, message = "Wrong google mail")
    @Size(min = 24, max = 50)
    private String googleEmail;

}
