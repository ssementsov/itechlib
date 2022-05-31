package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;

public interface MailTemplateService {

    String getAndFillConfirmationTemplateFromUser(User user, String templateText);

    String getAndFillTemplateFromBookingInfo(Booking booking, String templateText);

    Template getByName(String templateName);

}
