package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.entity.internal_notification.UserInternalNotification;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserInternalNotificationMapper {

    @Named(value = "UserInternalNotification")
    UserInternalNotificationDto toUserInternalNotificationDto(UserInternalNotification userInternalNotification);

    @Named(value = "UserInternalNotificationDto")
    UserInternalNotification toUserInternalNotification(UserInternalNotificationDto userInternalNotificationDto);

    @IterableMapping(qualifiedByName = "UserInternalNotification")
    List<UserInternalNotificationDto> mapUserInternalNotificationDtoList(List<UserInternalNotification> userInternalNotifications);

    @IterableMapping(qualifiedByName = "UserInternalNotificationDto")
    List<UserInternalNotification> mapUserInternalNotificationList(List<UserInternalNotificationDto> userInternalNotificationDtoList);

}