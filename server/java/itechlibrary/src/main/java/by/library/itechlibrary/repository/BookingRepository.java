package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Booking;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @EntityGraph(attributePaths = {"book", "reader"})
    List<Booking> findAllByReaderId(long readerId);

    @EntityGraph(attributePaths = {"book", "reader"})
    List<Booking> findAllByBookId(long bookId);

    @EntityGraph(attributePaths = {"book", "reader"})
    @Query("select b from Booking b where b.reader.id = :readerId and" +
            " b.startDate <= :currentDate and b.finishDate >= :currentDate")
    List<Booking> findAllByReaderIdAndCurrentDate(LocalDate currentDate, long readerId);

}
