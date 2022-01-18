package by.library.itechlibrary.dto.booking;


import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class FeedbackResponseDto {

    @NotNull
    private String feedback;

    @NotNull
    private String userFullName;

}
