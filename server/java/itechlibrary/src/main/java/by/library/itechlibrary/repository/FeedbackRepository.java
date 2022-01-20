package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.Feedback;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @EntityGraph(attributePaths = {"booking.reader"})
    @Query("select f from Feedback f where f.booking.book.id = :bookId")
    List<Feedback> findAllByBookId(long bookId);

}
