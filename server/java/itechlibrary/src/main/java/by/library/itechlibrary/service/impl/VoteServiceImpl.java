package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.vote.VoteConstant;
import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.dto.vote.GeneralAmountVoteDto;
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

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;


    @Override
    public void vote(VoteDto voteDto) {

        log.info("Try to map voteDto to vote.");

        Vote vote = voteMapper.toVote(voteDto);
        setDateAndUserId(vote);
        checkVote(vote);

        log.info("Try to save vote.");

        voteRepository.save(vote);

    }

    @Override
    public GeneralAmountVoteDto countObjectVotes(long objectId){

        log.info("Try to count positive and negative votes");

        GeneralAmountVoteDto generalAmountVoteDto = new GeneralAmountVoteDto();

        int positive = voteRepository.countVoteByVoteObjectIdAndVoteTypeName(objectId, VoteConstant.VOTE_TYPE_POSITIVE_NAME);
        int negative = voteRepository.countVoteByVoteObjectIdAndVoteTypeName(objectId, VoteConstant.VOTE_TYPE_NEGATIVE_NAME);
        generalAmountVoteDto.setPositive(positive);
        generalAmountVoteDto.setNegative(negative);
        setCurrentUserVote(generalAmountVoteDto, objectId);

        return generalAmountVoteDto;
    }

    private void setCurrentUserVote(GeneralAmountVoteDto generalAmountVoteDto, long objectId){

        long currentUserId = securityUserDetailsService.getCurrentUserId();

        getVoteByUserIdAndVoteObjectId(currentUserId, objectId)
                .ifPresent(x -> generalAmountVoteDto.setCurrentUserVote(x.getVoteType().getName()));

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

    private void setDateAndUserId(Vote vote) {

        log.info("Set date time and current user id to vote.");

        vote.setDate(LocalDateTime.now());
        vote.setUserId(securityUserDetailsService.getCurrentUserId());

    }

    private Optional<Vote> getVoteByUserIdAndVoteObjectId(long userId, long voteObjectId){

        return voteRepository.findByUserIdAndVoteObjectId(userId, voteObjectId);
    }
}

