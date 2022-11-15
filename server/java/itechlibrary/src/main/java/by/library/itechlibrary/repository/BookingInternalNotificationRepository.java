package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.internal_notification.BookingInternalNotification;
import by.library.itechlibrary.entity.internal_notification.BookingInternalNotificationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingInternalNotificationRepository extends JpaRepository<BookingInternalNotification, BookingInternalNotificationId> {

    @Query("select bin.notification.id from BookingInternalNotification bin where bin.id = :id")
    Optional<Long> getNotificationIdById(BookingInternalNotificationId id);

}