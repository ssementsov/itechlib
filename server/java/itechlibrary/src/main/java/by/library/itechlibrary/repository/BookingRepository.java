package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Booking;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @EntityGraph(attributePaths = { "book.language", "book.category", "book.status", "book.owner", "reader"})
    List<Booking> findAllByReaderId(long readerId);

    @EntityGraph(attributePaths = { "book.language", "book.category", "book.status", "book.owner", "reader"})
    List<Booking> findAllByBookId(long bookId);

    @EntityGraph(attributePaths = { "book.language", "book.category", "book.status", "book.owner", "reader"})
    @Query("select b from Booking b where b.reader.id = :readerId and" +
            " b.startDate <= :currentDate and b.finishDate >= :currentDate")
    List<Booking> findAllByReaderIdAndCurrentDate(LocalDate currentDate, long readerId);

    @EntityGraph(attributePaths = { "book.language", "book.category", "book.status", "book.owner", "reader"})
    Optional<Booking> findById(long id);

    @Query("select b from Booking b where b.reader.id = :readerId and" +
            " b.book.id = :bookId and b.isActive = true")
    Optional<Booking> findByActiveIsTrueAndReaderIdAndBookId(long readerId, long bookId);

    @EntityGraph(attributePaths = { "book.language", "book.category", "book.status", "book.owner", "reader"})
    @Query("select b from Booking b where b.book.id = :bookId and b.isActive = true")
    Optional<Booking> findByBookIdAndActiveIsTrue(long bookId);



}