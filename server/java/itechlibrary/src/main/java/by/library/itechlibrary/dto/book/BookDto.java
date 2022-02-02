package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.CategoryDto;
import by.library.itechlibrary.dto.LanguageDto;
import by.library.itechlibrary.dto.BookStatusDto;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
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
