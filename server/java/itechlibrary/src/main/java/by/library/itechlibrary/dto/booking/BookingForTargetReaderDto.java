package by.library.itechlibrary.dto.booking;

import by.library.itechlibrary.entity.BookingStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class BookingForTargetReaderDto {

    @Min(1)
    @NotNull
    private long readerId;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate finishDate;

    @NotNull
    private BookingStatus status;

}