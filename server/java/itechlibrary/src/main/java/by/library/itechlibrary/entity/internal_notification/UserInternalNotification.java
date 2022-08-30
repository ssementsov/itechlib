package by.library.itechlibrary.entity.internal_notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "users_internal_notifications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInternalNotification {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "internal_notification_id")
    private Long internalNotificationId;

    @Column(name = "is_read")
    private boolean isRead;

}
