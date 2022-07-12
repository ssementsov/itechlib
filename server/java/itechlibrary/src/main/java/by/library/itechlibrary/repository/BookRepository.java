package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "owner.roles", "fileInfo"})
    List<Book> findAllByOwnerId(long userId, Pageable pageable);

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "owner.roles", "fileInfo"})
    Optional<Book> findById(long id);

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "owner.roles", "fileInfo"})
    Page<Book> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "owner.roles", "fileInfo"})
    Book save(Book book);

    @EntityGraph(attributePaths = {"owner", "fileInfo"})
    Optional<Book> findByFileInfoId(long fileInfoId);

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "owner.roles", "fileInfo"})
    @Query("select distinct book from Book book" +
            " left join book.bookings booking where booking.isActive = true " +
            "and booking.reader.id = :readerId")
    List<Book> findAllActiveBooksByReaderId(long readerId);

}
