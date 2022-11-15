package by.library.itechlibrary.dto.internal_notification;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookingInternalNotificationDto {

    private Long bookingId;
    private Long userId;
    private Long templateId;
    private Long notificationId;

}