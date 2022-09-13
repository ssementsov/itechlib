package by.library.itechlibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingAcceptanceDto {

    @Min(1)
    @NotNull
    private long bookId;

    @Size(min = 10, max = 250)
    private String comment;

    @NotNull
    private BookingStatusDto status;

}