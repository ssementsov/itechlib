package by.library.itechlibrary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class NewBookingDto {

    private long id;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate finishDate;

    @NotNull
    private long bookId;

}
