package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;

public interface MailTemplateService {

    Template getAndFillConfirmationTemplate(User user);

    Template getAndFillTemplateFromBookingInfo(Booking booking, String templateName);

}
