package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.dto.booking.FeedbackResponseDto;
import by.library.itechlibrary.entity.Feedback;
import by.library.itechlibrary.repository.FeedbackRepository;
import by.library.itechlibrary.service.FeedbackService;
import by.library.itechlibrary.util.PaginationUtil;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Override
    public List<FeedbackResponseDto> getAll(SortingCriteria parameterInfoDto, long bookId) {

        Pageable pageable = PaginationUtil.getPageable(parameterInfoDto);
        List<Feedback> feedbackList = feedbackRepository.findAllByBookId(bookId, pageable);

        return mapToFeedbackResponseDtoList(feedbackList);
    }


    private List<FeedbackResponseDto> mapToFeedbackResponseDtoList(List<Feedback> feedbackList) {

        List<FeedbackResponseDto> feedbackResponseDtos = new ArrayList<>();

        for (Feedback f : feedbackList) {

            FeedbackResponseDto feedbackResponseDto = new FeedbackResponseDto();
            feedbackResponseDto.setFeedback(f.getText());
            feedbackResponseDto.setUserFullName(f.getBooking().getReader().getName() +
                   " " + f.getBooking().getReader().getSurname());
            feedbackResponseDto.setDate(f.getDate());
            feedbackResponseDto.setId(f.getId());
            feedbackResponseDtos.add(feedbackResponseDto);

        }

        return feedbackResponseDtos;
    }
}
