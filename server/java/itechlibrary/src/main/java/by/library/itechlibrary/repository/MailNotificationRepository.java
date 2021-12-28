package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.MailNotification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MailNotificationRepository extends JpaRepository<MailNotification, Long> {

    @EntityGraph(attributePaths = {"template", "user"})
    MailNotification save(MailNotification notification);

}
