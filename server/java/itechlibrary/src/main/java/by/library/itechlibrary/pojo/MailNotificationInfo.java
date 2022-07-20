package by.library.itechlibrary.pojo;

import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailNotificationInfo {

    private User user;
    private Template template;
    private String filedTemplateText;

}
