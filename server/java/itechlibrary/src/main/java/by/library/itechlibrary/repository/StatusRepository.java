package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusRepository extends JpaRepository<BookStatus, Short> {

    Optional<BookStatus> findByName(String name);

}
