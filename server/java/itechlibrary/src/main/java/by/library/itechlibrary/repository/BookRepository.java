package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Book;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "reader"})
    List<Book> findAllByOwnerId(long userId);

}
