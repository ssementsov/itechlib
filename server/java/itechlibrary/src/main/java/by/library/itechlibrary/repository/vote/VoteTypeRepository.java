package by.library.itechlibrary.repository.vote;

import by.library.itechlibrary.entity.vote.VoteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteTypeRepository extends JpaRepository<VoteType, Short> {
}
