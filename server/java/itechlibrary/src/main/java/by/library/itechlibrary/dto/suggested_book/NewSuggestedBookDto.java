package by.library.itechlibrary.dto.suggested_book;

import by.library.itechlibrary.constant.RegexConstant;
import by.library.itechlibrary.dto.CategoryDto;
import by.library.itechlibrary.dto.LanguageDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewSuggestedBookDto {

    @NotNull
    private String title;

    private String author;

    @Size(min = 10, max = 250)
    private String comment;

    @Pattern(regexp = RegexConstant.URL_REGEX)
    private String link;

    @NotNull
    private LanguageDto language;

    @NotNull
    private CategoryDto category;

    private SuggestedBookStatusDto status;

}