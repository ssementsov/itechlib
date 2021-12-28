package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;

public interface MailTemplateService {

    String fillTemplate(User user, Template template);
}
