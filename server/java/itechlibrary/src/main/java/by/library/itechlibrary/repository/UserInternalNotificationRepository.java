package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.internal_notification.UserInternalNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserInternalNotificationRepository extends JpaRepository<UserInternalNotification, Long> {

    List<UserInternalNotification> getAllByUserIdAndReadIsTrue(Long userId);

    @Modifying
    @Query("update UserInternalNotification uin set uin.isRead = true where uin.id = :id")
    void setReadIsTrueById(@Param("id") Long id);

}
