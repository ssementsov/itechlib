package by.library.itechlibrary.facade;

import by.library.itechlibrary.dto.criteria.BaseSearchCriteria;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.dto.suggested_book.NewSuggestedBookDto;
import by.library.itechlibrary.dto.suggested_book.SuggestedBookDto;
import by.library.itechlibrary.dto.vote.VoteDto;

import java.util.List;

public interface SuggestedBookFacade {

    void vote(VoteDto voteDto);

    SuggestedBookDto getById(long id);

    SuggestedBookDto update(SuggestedBookDto suggestedBookDto);

    List<SuggestedBookDto> getAll(List<BaseSearchCriteria> criteria, SortingCriteria parameterInfoDto);

    SuggestedBookDto create(NewSuggestedBookDto suggestedBookDto);

}
