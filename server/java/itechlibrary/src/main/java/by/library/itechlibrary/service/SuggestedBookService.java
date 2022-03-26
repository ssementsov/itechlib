package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.SuggestedBookDto;

import java.util.List;

public interface SuggestedBookService {

    List<SuggestedBookDto> getAll(int pageNumber, int pageCapacity);

    SuggestedBookDto getById(long id);

    void remove(long id);

    SuggestedBookDto create(SuggestedBookDto suggestedBookDto);

    SuggestedBookDto update(SuggestedBookDto suggestedBookDto);

}
