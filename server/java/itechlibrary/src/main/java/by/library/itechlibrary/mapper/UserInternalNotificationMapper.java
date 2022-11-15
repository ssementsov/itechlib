package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.internal_notification.BookingInternalNotificationDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationCreateDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;
import by.library.itechlibrary.entity.internal_notification.BookingInternalNotification;
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

    @Mapping(target = "id.bookingId", source = "bookingId")
    @Mapping(target = "id.userId", source = "userId")
    @Mapping(target = "id.templateId", source = "templateId")
    @Mapping(target = "notification.id", source = "notificationId")
    @Named(value = "toBookingInternalNotification")
    BookingInternalNotification toBookingInternalNotification(BookingInternalNotificationDto bookingInternalNotificationDto);

    @Mapping(target = "bookingId", source = "id.bookingId")
    @Mapping(target = "userId", source = "id.userId")
    @Mapping(target = "templateId", source = "id.templateId")
    @Mapping(target = "notificationId", source = "notification.id")
    @Named(value = "toBookingInternalNotificationDto")
    BookingInternalNotificationDto toBookingInternalNotificationDto(BookingInternalNotification bookingInternalNotification);

    @IterableMapping(qualifiedByName = "UserInternalNotification")
    List<UserInternalNotificationDto> mapUserInternalNotificationDtoList(List<UserInternalNotification> userInternalNotifications);

}