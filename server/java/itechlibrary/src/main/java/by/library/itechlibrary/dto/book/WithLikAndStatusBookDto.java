package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.BookStatusDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithLikAndStatusBookDto extends BaseBookDto {

    private String link;

    @NotNull
    private BookStatusDto status;

}
