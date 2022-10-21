package by.library.itechlibrary.service.impl;


import by.library.itechlibrary.constant.InternalNotificationConstant;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationCreateDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;
import by.library.itechlibrary.entity.internal_notification.UserInternalNotification;
import by.library.itechlibrary.mapper.UserInternalNotificationMapper;
import by.library.itechlibrary.repository.UserInternalNotificationRepository;
import by.library.itechlibrary.service.UserInternalNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserInternalNotificationServiceImpl implements UserInternalNotificationService {

    private final UserInternalNotificationRepository userInternalNotificationRepository;

    private final UserInternalNotificationMapper userInternalNotificationMapper;

    private final SimpMessagingTemplate simpMessagingTemplate;


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

    @Override
    public boolean isUnread(long userId) {

        log.info("Try to find out, has reader unread messages or not.");

        return userInternalNotificationRepository.isUnreadByUserId(userId);

    }

    @Override
    public void sent(UserInternalNotificationCreateDto internalNotificationCreateDto) {

        save(internalNotificationCreateDto);
        notifyUserAboutNotifications(internalNotificationCreateDto.getUserId(), true);

    }

    private UserInternalNotificationDto save(UserInternalNotificationCreateDto internalNotificationCreateDto) {

        log.info("Try to save internal notification for user.");

        UserInternalNotification internalNotification = userInternalNotificationMapper.toUserInternalNotification(internalNotificationCreateDto);
        internalNotification = userInternalNotificationRepository.save(internalNotification);

        return userInternalNotificationMapper.toUserInternalNotificationDto(internalNotification);
    }

    private void notifyUserAboutNotifications(long userId, boolean existUnreadNotification) {

        String destination = String.format("%s/%d", InternalNotificationConstant.DESTINATION_PREFIX, userId);
        simpMessagingTemplate.convertAndSend(destination, existUnreadNotification);

    }


}
