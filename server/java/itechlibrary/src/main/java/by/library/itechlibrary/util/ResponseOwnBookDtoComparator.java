package by.library.itechlibrary.util;

import by.library.itechlibrary.dto.book.ResponseOwnBookDto;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Comparator;

@Component
public class ResponseOwnBookDtoComparator implements Comparator<ResponseOwnBookDto> {

    @Override
    public int compare(ResponseOwnBookDto b1, ResponseOwnBookDto b2) {

        LocalDate b1Date = b1.getBaseBookingInfo().getFinishDate();
        LocalDate b2Date = b2.getBaseBookingInfo().getFinishDate();

        if (b1Date.isBefore(b2Date)) {

            return -1;

        }

        if (b1Date.isAfter(b2Date)) {

            return 1;
        }

        return 0;

    }
}
