package by.library.itechlibrary.repository;

import by.library.itechlibrary.entity.vote.SuggestedBookVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuggestedBookVoteRepository extends JpaRepository<SuggestedBookVote, Long> {


}
