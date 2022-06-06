package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.dto.booking.FeedbackResponseDto;

import java.util.List;

public interface FeedbackService {

    List<FeedbackResponseDto> getAll(SortingCriteria parameterInfoDto, long bookId);

}
