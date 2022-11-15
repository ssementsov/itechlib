package by.library.itechlibrary.entity.internal_notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "booking_internal_notification")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingInternalNotification {

    @EmbeddedId
    private BookingInternalNotificationId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "internal_notification_id")
    private UserInternalNotification notification;

}