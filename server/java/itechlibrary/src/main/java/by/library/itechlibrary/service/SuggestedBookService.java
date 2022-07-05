package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.suggested_book.NewSuggestedBookDto;
import by.library.itechlibrary.dto.suggested_book.SuggestedBookDto;
import by.library.itechlibrary.dto.criteria.BaseSearchCriteria;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.entity.User;

import java.util.List;

public interface SuggestedBookService {

    List<SuggestedBookDto> getAll(List<BaseSearchCriteria> criteria, SortingCriteria parameterInfoDto);

    SuggestedBookDto getById(long id);

    void remove(long id);

    SuggestedBookDto create(NewSuggestedBookDto suggestedBookDto, User user);

    SuggestedBookDto update(SuggestedBookDto suggestedBookDto);

    void addVoteCount(String voteTypeName, long suggestedBookId);

    void setUserVoteType(SuggestedBookDto suggestedBookDto,  String voteTypeName);

}
