package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.entity.vote.Vote;

public interface VoteService {

    Vote vote(VoteDto voteDto);

    String getCurrentUserVoteTypeName(long objectId);

}
