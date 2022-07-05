package by.library.itechlibrary.fasade.impl;

import by.library.itechlibrary.dto.criteria.BaseSearchCriteria;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.dto.suggested_book.NewSuggestedBookDto;
import by.library.itechlibrary.dto.suggested_book.SuggestedBookDto;
import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.vote.Vote;
import by.library.itechlibrary.fasade.SuggestedBookFacade;
import by.library.itechlibrary.service.SuggestedBookService;
import by.library.itechlibrary.service.UserService;
import by.library.itechlibrary.service.VoteService;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class SuggestedBookFacadeImpl implements SuggestedBookFacade {

    private final VoteService voteService;

    private final SuggestedBookService suggestedBookService;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final UserService userService;


    @Override
    public void vote(VoteDto voteDto) {

        Vote vote = voteService.vote(voteDto);
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

    @Transactional
    @Override
    public SuggestedBookDto create(NewSuggestedBookDto suggestedBookDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        User user = userService.getUserById(currentUserId);

        return suggestedBookService.create(suggestedBookDto, user);
    }

    private void getVoteTypeAndSetToSuggestedBook(SuggestedBookDto suggestedBookDto) {

        String voteTypeName = voteService.getCurrentUserVoteTypeName(suggestedBookDto.getId());
        suggestedBookService.setUserVoteType(suggestedBookDto, voteTypeName);

    }
}
