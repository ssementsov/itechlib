package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.service.VoteService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class SuggestedBookVoteServiceImpl implements VoteService {

    @Override
    public boolean isVote(long id) {
        return false;
    }
}

