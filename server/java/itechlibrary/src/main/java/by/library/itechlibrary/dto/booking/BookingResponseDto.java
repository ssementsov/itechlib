package by.library.itechlibrary.dto.booking;

import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class BookingResponseDto {

    private long id;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate finishDate;

    @NotNull
    private WithOwnerBookDto book;

    private boolean isActive;

}