package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.SuggestedBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuggestedBookRepository extends JpaRepository<SuggestedBook, Long> {

    @EntityGraph(attributePaths = {"language", "status", "category", "creator"})
    Optional<SuggestedBook> findById(long id);

    @EntityGraph(attributePaths = {"language", "status", "category", "creator"})
    Page<SuggestedBook> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"language", "status", "category", "creator"})
    SuggestedBook save(SuggestedBook suggestedBook);

}
