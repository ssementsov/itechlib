package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.dto.criteria.BaseSearchCriteria;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.dto.suggested_book.NewSuggestedBookDto;
import by.library.itechlibrary.dto.suggested_book.SuggestedBookDto;
import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.vote.SuggestedBookVoteCounter;
import by.library.itechlibrary.entity.vote.Vote;
import by.library.itechlibrary.facade.SuggestedBookFacade;
import by.library.itechlibrary.service.SuggestedBookService;
import by.library.itechlibrary.service.SuggestedBookVoteCounterService;
import by.library.itechlibrary.service.UserService;
import by.library.itechlibrary.service.VoteService;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class SuggestedBookFacadeImpl implements SuggestedBookFacade {

    private final VoteService voteService;

    private final SuggestedBookService suggestedBookService;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final UserService userService;

    private final SuggestedBookVoteCounterService suggestedBookVoteCounterService;


    @Override
    @Transactional
    public void vote(VoteDto voteDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        Vote vote = voteService.vote(voteDto, currentUserId);
        String voteTypeName = vote.getVoteType().getName();
        suggestedBookService.addVoteCount(voteTypeName, vote.getVoteObjectId());

    }

    @Override
    public SuggestedBookDto getById(long id) {

        SuggestedBookDto suggestedBookDto = suggestedBookService.getById(id);
        getVoteTypeAndSetToSuggestedBook(suggestedBookDto);

        return suggestedBookDto;
    }

    @Override
    public SuggestedBookDto update(SuggestedBookDto suggestedBookDto) {

        SuggestedBookDto updatedSuggestedBookDto = suggestedBookService.update(suggestedBookDto);
        getVoteTypeAndSetToSuggestedBook(updatedSuggestedBookDto);

        return updatedSuggestedBookDto;
    }

    @Override
    public List<SuggestedBookDto> getAll(List<BaseSearchCriteria> criteria, SortingCriteria parameterInfoDto) {

        List<SuggestedBookDto> suggestedBookDtoList = suggestedBookService.getAll(criteria, parameterInfoDto);
        suggestedBookDtoList.forEach(this::getVoteTypeAndSetToSuggestedBook);

        return suggestedBookDtoList;
    }

    @Override
    @Transactional
    public SuggestedBookDto create(NewSuggestedBookDto suggestedBookDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        User user = userService.getUserById(currentUserId);
        SuggestedBookVoteCounter suggestedBookVoteCounter = suggestedBookVoteCounterService.create(new SuggestedBookVoteCounter());

        return suggestedBookService.create(suggestedBookDto, user, suggestedBookVoteCounter);
    }

    private void getVoteTypeAndSetToSuggestedBook(SuggestedBookDto suggestedBookDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        String voteTypeName = voteService.getCurrentUserVoteTypeName(suggestedBookDto.getId(), currentUserId);
        suggestedBookService.setUserVoteType(suggestedBookDto, voteTypeName);

    }
}