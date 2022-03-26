package by.library.itechlibrary.repository.vote;

import by.library.itechlibrary.entity.vote.VoteObjectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteObjectTypeRepository extends JpaRepository<VoteObjectType, Short> {
}
