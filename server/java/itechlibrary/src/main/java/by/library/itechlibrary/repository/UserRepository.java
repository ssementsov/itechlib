package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = {"confirmationData", "roles"})
    Optional<User> findById(long id);

    @EntityGraph(attributePaths = {"confirmationData", "fileInfo", "roles"})
    Optional<User> findByGoogleEmail(String email);

    @EntityGraph(attributePaths = {"confirmationData", "fileInfo", "roles"})
    Optional<User> findByCorpEmail(String email);

    @EntityGraph(attributePaths = {"confirmationData", "roles"})
    List<User> findAllByGoogleEmailNotNull();

}
