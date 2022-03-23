package by.library.itechlibrary.repository.vote;

import by.library.itechlibrary.entity.vote.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {


}
