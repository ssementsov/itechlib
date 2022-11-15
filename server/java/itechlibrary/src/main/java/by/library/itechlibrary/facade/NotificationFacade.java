package by.library.itechlibrary.facade;

import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.User;

public interface NotificationFacade {

    void sentEmailNotificationAboutBooking(Booking booking, User targetUser, String templateName, boolean isCorporateEmail);

    void sentEmailNotificationAboutUser(User targetUser, String templateName, boolean isCorporateEmail);

    void sentInternalNotificationAboutBooking(Booking booking, long targetUserId, String templateName);

    void markInternalNotificationAsRead(long userId, long bookingId, String templateName);

    String chooseEmailTemplateName(String bookingStatusName);

    String chooseInternalTemplateName(String bookingStatusName);

}
