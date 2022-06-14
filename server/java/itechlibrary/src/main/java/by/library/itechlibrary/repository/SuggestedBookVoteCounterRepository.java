package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.vote.SuggestedBookVoteCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuggestedBookVoteCounterRepository extends JpaRepository<SuggestedBookVoteCounter, Long> {

}
