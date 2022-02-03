package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.SuggestedBookStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuggestedBookStatusRepository extends JpaRepository<SuggestedBookStatus, Short> {

}
