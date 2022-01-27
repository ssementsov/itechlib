package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Book;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "fileInfo"})
    List<Book> findAllByOwnerId(long userId);

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "fileInfo"})
    Optional<Book> findById(long id);

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "fileInfo"})
    List<Book> findAll();

    @EntityGraph(attributePaths = {"language", "status", "category", "owner", "fileInfo"})
    Book save(Book book);

    @Modifying
    @Query("update Book b set b.fileInfo = null where b.fileInfo.id = :fileId")
    void removeFileInfoFromBook(long fileId);

    @EntityGraph(attributePaths = {"owner", "fileInfo"})
    Optional<Book> findByFileInfoId(long fileInfoId);

}
