package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.internal_notification.UserInternalNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInternalNotificationRepository extends JpaRepository<UserInternalNotification, Long> {

    @Query("select uin from UserInternalNotification uin where uin.userId = :userId and uin.isRead = false")
    List<UserInternalNotification> getByUserIdAndReadIsFalse(@Param("userId") Long userId);

    @Modifying
    @Query("update UserInternalNotification uin set uin.isRead = true where uin.id = :id")
    void setReadIsTrueById(@Param("id") Long id);

    @Query("select new java.lang.Boolean(count(*) > 0) from UserInternalNotification uin where uin.userId = :userId and uin.isRead is false")
    Boolean isUnreadByUserId(@Param("userId") Long userId);

}