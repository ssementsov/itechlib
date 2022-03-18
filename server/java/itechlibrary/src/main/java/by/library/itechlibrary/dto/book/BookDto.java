package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.CategoryDto;
import by.library.itechlibrary.dto.LanguageDto;
import by.library.itechlibrary.dto.BookStatusDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    private String link;

    @NotNull
    private String author;

    private double rate;

    @NotNull
    private LanguageDto language;

    @NotNull
    private CategoryDto category;

    @NotNull
    private BookStatusDto status;

}
