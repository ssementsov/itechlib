package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationCreateDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;

import javax.transaction.Transactional;
import java.util.List;

public interface UserInternalNotificationService {

    List<UserInternalNotificationDto> getUnReadNotificationsByUserId(Long userId);

    void markIsRead(Long userInternalNotificationId);

    boolean isUnread(long userId);

    @Transactional
    void sent(UserInternalNotificationCreateDto internalNotificationCreateDto);
}