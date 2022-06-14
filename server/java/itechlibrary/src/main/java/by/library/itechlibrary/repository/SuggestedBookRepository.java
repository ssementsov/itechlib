package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.QSuggestedBook;
import by.library.itechlibrary.entity.SuggestedBook;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuggestedBookRepository extends JpaRepository<SuggestedBook, Long>,
        QuerydslPredicateExecutor<SuggestedBook>, QuerydslBinderCustomizer<QSuggestedBook> {

    @Override
    default void customize(
            QuerydslBindings bindings, QSuggestedBook root) {
        bindings.bind(String.class)
                .first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @EntityGraph(attributePaths = {"language", "status", "category", "creator", "suggestedBookVoteCounter"})
    Optional<SuggestedBook> findById(long id);

    @EntityGraph(attributePaths = {"language", "status", "category", "creator", "suggestedBookVoteCounter"})
    Page<SuggestedBook> findAll(Predicate predicate, Pageable pageable);

    @EntityGraph(attributePaths = {"language", "status", "category", "creator", "suggestedBookVoteCounter"})
    Page<SuggestedBook> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"language", "status", "category", "creator", "suggestedBookVoteCounter"})
    SuggestedBook save(SuggestedBook suggestedBook);

}
