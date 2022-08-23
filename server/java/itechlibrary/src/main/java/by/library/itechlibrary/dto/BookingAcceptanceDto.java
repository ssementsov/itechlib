package by.library.itechlibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingAcceptanceDto {

    @Min(1)
    @NotNull
    private long bookId;

    @Min(1)
    @NotNull
    private long authorId;

    @NotNull
    private BookingStatusDto status;

}