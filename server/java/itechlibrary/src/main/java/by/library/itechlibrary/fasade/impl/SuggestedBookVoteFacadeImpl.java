package by.library.itechlibrary.fasade.impl;

import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.entity.vote.Vote;
import by.library.itechlibrary.fasade.SuggestedBookVoteFacade;
import by.library.itechlibrary.service.SuggestedBookService;
import by.library.itechlibrary.service.VoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class SuggestedBookVoteFacadeImpl implements SuggestedBookVoteFacade {

    private final VoteService voteService;

    private final SuggestedBookService suggestedBookService;


    @Override
    public void vote(VoteDto voteDto) {

        Vote vote = voteService.vote(voteDto);
        String voteTypeName = vote.getVoteType().getName();
        suggestedBookService.addVoteCount(voteTypeName, vote.getVoteObjectId());

    }
}
