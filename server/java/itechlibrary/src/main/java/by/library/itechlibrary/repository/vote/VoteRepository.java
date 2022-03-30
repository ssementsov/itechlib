package by.library.itechlibrary.repository.vote;

import by.library.itechlibrary.entity.vote.Vote;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @EntityGraph(attributePaths = {"voteType"})
    Optional<Vote> findByUserIdAndVoteObjectId(long userId, long voteObjectId);

    int countVoteByVoteObjectIdAndVoteTypeName(long voteObjectId, String voteTypeName);

}
