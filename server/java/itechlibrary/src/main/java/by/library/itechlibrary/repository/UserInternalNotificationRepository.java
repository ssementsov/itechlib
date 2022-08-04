package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.internal_notification.UserInternalNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInternalNotificationRepository extends JpaRepository<UserInternalNotification, Long> {
}
