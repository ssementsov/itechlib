package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.internal_notification.InternalNotificationTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InternalNotificationTemplateRepository extends JpaRepository<InternalNotificationTemplate, Long> {

    Optional<InternalNotificationTemplate> findByName(String name);

}