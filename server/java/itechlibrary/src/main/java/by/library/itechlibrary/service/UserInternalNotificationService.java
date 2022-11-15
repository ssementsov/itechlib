package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.internal_notification.BookingInternalNotificationDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationCreateDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;

import java.util.List;

public interface UserInternalNotificationService {

    List<UserInternalNotificationDto> getUnReadNotificationsByUserId(Long userId);

    void markIsRead(Long userInternalNotificationId);

    boolean isUnread(long userId);

    UserInternalNotificationDto save(UserInternalNotificationCreateDto internalNotificationCreateDto);

    BookingInternalNotificationDto saveBookingInternalNotification(BookingInternalNotificationDto bookingInternalNotificationDto);

    void notifyUserAboutNotifications(long userId, boolean existUnreadNotification);

}