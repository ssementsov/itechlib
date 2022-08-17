package by.library.itechlibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingAcceptanceDto {

    private long bookId;

    private long authorId;

    private BookingAcceptanceStatusDto status;

}