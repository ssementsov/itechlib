package by.library.itechlibrary.dto.booking;

import lombok.Data;

@Data
public class BookingWithCurrentUserReaderDto extends BookingDto{

    private boolean isCurrentUserReader;

}