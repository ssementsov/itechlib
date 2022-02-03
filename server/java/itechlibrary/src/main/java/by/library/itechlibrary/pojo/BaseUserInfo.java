package by.library.itechlibrary.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseUserInfo {

    private String name;
    private String surname;
    private String corpEmail;
    private Boolean isActive;

}
