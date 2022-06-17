package by.library.itechlibrary.dto.booking;


import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class FeedbackResponseDto {

    private long id;

    @Size(min = 2, max = 250)
    @NotNull
    private String feedback;

    @NotNull
    private String userFullName;

    @NotNull
    private LocalDate date;

}
