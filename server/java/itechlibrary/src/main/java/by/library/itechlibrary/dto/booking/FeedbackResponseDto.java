package by.library.itechlibrary.dto.booking;


import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class FeedbackResponseDto {

    private long id;

    @NotNull
    private String feedback;

    @NotNull
    private String userFullName;

    @NotNull
    private LocalDate date;

}
