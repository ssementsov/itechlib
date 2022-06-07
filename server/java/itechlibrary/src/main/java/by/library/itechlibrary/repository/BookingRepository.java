package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.UserRole;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @EntityGraph(attributePaths = {"book.language", "book.category", "book.status", "book.owner", "reader"})
    List<Booking> findAllByReaderId(long readerId);

    @EntityGraph(attributePaths = {"book.language", "book.category", "book.status", "book.owner", "reader"})
    List<Booking> findAllByBookId(long bookId);

    @EntityGraph(attributePaths = {"book.language", "book.category", "book.status", "book.owner", "reader"})
    @Query("select b from Booking b where b.reader.id = :readerId and" +
            " b.startDate <= :currentDate and b.finishDate >= :currentDate")
    List<Booking> findAllByReaderIdAndCurrentDate(LocalDate currentDate, long readerId);

    @EntityGraph(attributePaths = {"book.language", "book.category", "book.status", "book.owner", "reader"})
    Optional<Booking> findById(long id);

    @EntityGraph(attributePaths = {"book.language", "book.category", "book.status", "book.owner", "reader"})
    @Query("select b from Booking b where b.book.id = :bookId and b.isActive = true")
    Optional<Booking> findByBookIdAndActiveIsTrue(long bookId);

    @EntityGraph(attributePaths = {"book.language", "book.category", "book.status", "book.owner", "reader"})
    @Query("select b from Booking b where b.reader.id = :readerId and b.isActive = true")
    List<Booking> findByReaderIdAndActiveIsTrue(long readerId);

    @Query("select b.rate from Booking b where b.book.id = :bookId and b.rate <> 0")
    List<Short> getRatesByBookId(Long bookId);

    @Query("select b from Booking b where b.finishDate < CURRENT_DATE and b.isActive = true")
    List<Booking> findAllByFinishDateBeforeAndActiveIsTrue(UserRole role);

    @Query("select count(b) from Booking b where b.finishDate < CURRENT_DATE and b.isActive = true and b.reader.id = :readerId")
    int findByReaderIdAndFinishDateBeforeAndActiveIsTrue(long readerId);

    @Query("select count(b) from Booking b where b.isActive = true and b.reader.id = :readerId")
    int findCountByReaderIdAndActiveIsTrue(long readerId);

    @Query("select b from Booking b where b.finishDate < :maximumFinishDate and b.finishDate >= CURRENT_DATE and b.isActive = true")
    List<Booking> findAllByFinishDateLessOnThreeDaysAnActiveIsTrue(LocalDate maximumFinishDate);

}