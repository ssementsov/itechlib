package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationCreateDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;
import by.library.itechlibrary.entity.internal_notification.UserInternalNotification;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserInternalNotificationMapper {

    @Named(value = "UserInternalNotification")
    UserInternalNotificationDto toUserInternalNotificationDto(UserInternalNotification userInternalNotification);

    @Named(value = "UserInternalNotificationDto")
    UserInternalNotification toUserInternalNotification(UserInternalNotificationDto userInternalNotificationDto);

    @Mapping(target = "creationDateTime", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "template.id", source = "templateId")
    @Mapping(target = "read", constant = "false")
    @Named(value = "UserInternalNotificationCreateDto")
    UserInternalNotification toUserInternalNotification(UserInternalNotificationCreateDto userInternalNotificationCreateDto);

    @IterableMapping(qualifiedByName = "UserInternalNotification")
    List<UserInternalNotificationDto> mapUserInternalNotificationDtoList(List<UserInternalNotification> userInternalNotifications);

}