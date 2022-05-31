package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;

public interface MailTemplateService {

    Template getAndFillConfirmationTemplateFromUser(User user, String templateName);

    Template getAndFillTemplateFromBookingInfo(Booking booking, String templateName);

}
