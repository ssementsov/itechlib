package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.BookingAcceptance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingAcceptanceRepository extends JpaRepository<BookingAcceptance, Long> {
}