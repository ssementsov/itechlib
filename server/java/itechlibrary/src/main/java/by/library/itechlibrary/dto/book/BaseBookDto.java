package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.CategoryDto;
import by.library.itechlibrary.dto.LanguageDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseBookDto {

    private long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private String author;

    private double rate;

    @NotNull
    private LanguageDto language;

    @NotNull
    private CategoryDto category;

}
