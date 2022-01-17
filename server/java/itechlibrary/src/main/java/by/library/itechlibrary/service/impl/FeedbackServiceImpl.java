package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.dto.booking.FeedbackResponseDto;
import by.library.itechlibrary.entity.feedback.Feedback;
import by.library.itechlibrary.repository.FeedbackRepository;
import by.library.itechlibrary.service.FeedbackService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public List<FeedbackResponseDto> getFeedbackResponses(long bookId) {

        List<Feedback> feedbackList = feedbackRepository.findAllByBookId(bookId);

        return mapToFeedbackResponseDtoList(feedbackList);
    }


    private List<FeedbackResponseDto> mapToFeedbackResponseDtoList(List<Feedback> feedbackList) {

        List<FeedbackResponseDto> feedbackResponseDtos = new ArrayList<>();

        for (Feedback f : feedbackList) {

            FeedbackResponseDto feedbackResponseDto = new FeedbackResponseDto();
            feedbackResponseDto.setFeedback(f.getFeedback());
            feedbackResponseDto.setUserFullName(f.getUserInfo().getName() + " " + f.getUserInfo().getSurname());
            feedbackResponseDtos.add(feedbackResponseDto);

        }

        return feedbackResponseDtos;
    }
}
