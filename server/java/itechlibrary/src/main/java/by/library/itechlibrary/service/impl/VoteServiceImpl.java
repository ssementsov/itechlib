package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.vote.VoteConstant;
import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.entity.vote.Vote;
import by.library.itechlibrary.entity.vote.VoteObjectType;
import by.library.itechlibrary.entity.vote.VoteType;
import by.library.itechlibrary.exeption_handler.exception.WrongVoteException;
import by.library.itechlibrary.mapper.VoteMapper;
import by.library.itechlibrary.repository.vote.VoteRepository;
import by.library.itechlibrary.service.VoteService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class VoteServiceImpl implements VoteService {

    private final VoteMapper voteMapper;

    private final VoteRepository voteRepository;

    @Override
    public Vote vote(VoteDto voteDto, long currentUserId) {

        log.info("Try to map voteDto to vote.");

        Vote vote = voteMapper.toVote(voteDto);
        setDateAndUserId(vote, currentUserId);
        checkVote(vote);

        log.info("Try to save vote.");

        return voteRepository.save(vote);

    }

    @Override
    public String getCurrentUserVoteTypeName(long objectId, long currentUserId){

        log.info("Try to count positive and negative votes");

        return setCurrentUserVote(objectId, currentUserId);
    }

    private String setCurrentUserVote(long objectId, long currentUserId){

        Optional<Vote> voteOptional = getVoteByUserIdAndVoteObjectId(currentUserId, objectId);

        if(voteOptional.isPresent()){

            return voteOptional.get().getVoteType().getName();
        }

        return "";
    }

    private void checkVote(Vote vote){

        checkUniqueVote(vote);
        checkVoteType(vote.getVoteType());
        checkVoteObjectType(vote.getVoteObjectType());

    }

    private void checkUniqueVote(Vote vote) {

        if (getVoteByUserIdAndVoteObjectId(vote.getUserId(), vote.getVoteObjectId()).isPresent()) {

            throw new WrongVoteException("This user already voted.");

        }
    }

    private void checkVoteType(VoteType voteType){

        if(!VoteConstant.VOTE_TYPES.contains(voteType)){

            throw new WrongVoteException("Wrong vote type.");

        }
    }

    private void checkVoteObjectType(VoteObjectType voteObjectType){

        if(!VoteConstant.VOTE_OBJECT_TYPES.contains(voteObjectType)){

            throw new WrongVoteException("Wrong vote object type.");

        }
    }

    private void setDateAndUserId(Vote vote, long currentUserId) {

        log.info("Set date time and current user id to vote.");

        vote.setDate(LocalDateTime.now());
        vote.setUserId(currentUserId);

    }

    private Optional<Vote> getVoteByUserIdAndVoteObjectId(long userId, long voteObjectId){

        return voteRepository.findByUserIdAndVoteObjectId(userId, voteObjectId);
    }
}

