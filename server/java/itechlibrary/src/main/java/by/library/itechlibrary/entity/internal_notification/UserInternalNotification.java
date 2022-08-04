package by.library.itechlibrary.entity.internal_notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users_internal_notifications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInternalNotification {

    @Id
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "internal_notification_id")
    private Long internalNotificationId;

}
