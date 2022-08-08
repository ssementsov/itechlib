package by.library.itechlibrary.dto.suggested_book;

import by.library.itechlibrary.constant.RegexConstant;
import by.library.itechlibrary.dto.CategoryDto;
import by.library.itechlibrary.dto.LanguageDto;
import by.library.itechlibrary.dto.user.UserDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuggestedBookDto {

    private long id;

    @NotNull
    private String title;

    private String author;

    @Size(min = 10, max = 250)
    private String comment;

    @Pattern(regexp = RegexConstant.URL_REGEX)
    private String link;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;

    @NotNull
    private LanguageDto language;

    @NotNull
    private CategoryDto category;

    private SuggestedBookStatusDto status;

    private UserDto creator;

    private SuggestedBookVoteCounterDto suggestedBookVoteCounter;

}
