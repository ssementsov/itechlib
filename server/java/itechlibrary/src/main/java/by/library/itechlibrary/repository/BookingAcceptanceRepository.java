package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.BookingAcceptance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingAcceptanceRepository extends JpaRepository<BookingAcceptance, Long> {

    Optional<BookingAcceptance> findByBook_Id(long bookId);

}