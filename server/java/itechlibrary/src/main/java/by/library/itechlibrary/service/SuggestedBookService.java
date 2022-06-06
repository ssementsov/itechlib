package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.SuggestedBookDto;
import by.library.itechlibrary.dto.criteria.BaseSearchCriteria;
import by.library.itechlibrary.dto.criteria.SortingCriteria;

import java.util.List;

public interface SuggestedBookService {

    List<SuggestedBookDto> getAll(List<BaseSearchCriteria> criteria, SortingCriteria parameterInfoDto);

    SuggestedBookDto getById(long id);

    void remove(long id);

    SuggestedBookDto create(SuggestedBookDto suggestedBookDto);

    SuggestedBookDto update(SuggestedBookDto suggestedBookDto);

}
