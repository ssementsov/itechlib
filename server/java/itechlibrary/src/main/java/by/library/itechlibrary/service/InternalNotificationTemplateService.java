package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.internal_notification.InternalNotificationTemplate;

public interface InternalNotificationTemplateService {

    String fillTemplateTextFromBooking(Booking booking, String templateText);

    String fillTemplateLinkFromBooking(Booking booking, String templateLink);

    InternalNotificationTemplate getByName(String templateName);

}