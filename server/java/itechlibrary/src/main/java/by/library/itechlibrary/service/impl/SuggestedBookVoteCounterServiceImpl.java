package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.vote.SuggestedBookVoteCounter;
import by.library.itechlibrary.repository.SuggestedBookVoteCounterRepository;
import by.library.itechlibrary.service.SuggestedBookVoteCounterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SuggestedBookVoteCounterServiceImpl implements SuggestedBookVoteCounterService {

    private final SuggestedBookVoteCounterRepository suggestedBookVoteCounterRepository;


    @Override
    public SuggestedBookVoteCounter create(SuggestedBookVoteCounter suggestedBookVoteCounter) {

        return suggestedBookVoteCounterRepository.save(suggestedBookVoteCounter);
    }

}