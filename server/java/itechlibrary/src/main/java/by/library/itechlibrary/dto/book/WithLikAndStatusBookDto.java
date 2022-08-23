package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.constant.RegexConstant;
import by.library.itechlibrary.dto.BookingStatusDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithLikAndStatusBookDto extends BaseBookDto {

    @Pattern(regexp = RegexConstant.URL_REGEX)
    private String link;

    @NotNull
    private BookingStatusDto status;

}
