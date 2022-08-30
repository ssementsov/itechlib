package by.library.itechlibrary.service.impl;


import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;
import by.library.itechlibrary.entity.internal_notification.UserInternalNotification;
import by.library.itechlibrary.mapper.UserInternalNotificationMapper;
import by.library.itechlibrary.repository.UserInternalNotificationRepository;
import by.library.itechlibrary.service.UserInternalNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserInternalNotificationServiceImpl implements UserInternalNotificationService {

    private final UserInternalNotificationRepository userInternalNotificationRepository;

    private final UserInternalNotificationMapper userInternalNotificationMapper;


    @Override
    public List<UserInternalNotificationDto> getUnReadNotificationsByUserId(Long userId) {

        log.info("Try get unread userInternalNotification List by user id");

        List<UserInternalNotification> userInternalNotifications = userInternalNotificationRepository.getByUserIdAndReadIsFalse(userId);

        return userInternalNotificationMapper.mapUserInternalNotificationDtoList(userInternalNotifications);
    }

    @Override
    public void markIsRead(Long userInternalNotificationId) {

        log.info("Mark userInternalNotification as read.");

        userInternalNotificationRepository.setReadIsTrueById(userInternalNotificationId);

    }
}
