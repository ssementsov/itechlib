package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByGoogleEmail(String email);

    Optional<User> findByCorpEmail(String email);

    List<User> findAllByGoogleEmailNotNull();

}
