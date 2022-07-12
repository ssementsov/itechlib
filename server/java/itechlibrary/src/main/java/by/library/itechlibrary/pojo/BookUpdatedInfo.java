package by.library.itechlibrary.pojo;

import by.library.itechlibrary.dto.book.FullBookDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookUpdatedInfo {

    private FullBookDto fullBookDto;

    private boolean isDisableBooking;

}
