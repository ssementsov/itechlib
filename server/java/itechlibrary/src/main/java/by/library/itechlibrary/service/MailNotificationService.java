package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.User;

public interface MailNotificationService {

    void sent(User user, String templateName);
}
