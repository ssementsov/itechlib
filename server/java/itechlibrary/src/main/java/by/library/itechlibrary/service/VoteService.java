package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.dto.vote.GeneralAmountVoteDto;

public interface VoteService {

    void vote(VoteDto voteDto);

    GeneralAmountVoteDto countObjectVotes(long objectId);

}
