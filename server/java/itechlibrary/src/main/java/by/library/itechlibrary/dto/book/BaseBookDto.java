package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.CategoryDto;
import by.library.itechlibrary.dto.LanguageDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseBookDto {

    private long id;

    @Size(min = 2, max = 255)
    @NotNull
    private String title;

    @Size(min = 10, max = 500)
    private String description;

    @Size(min = 2, max = 500)
    @NotNull
    private String author;

    private double rate;

    @NotNull
    private LanguageDto language;

    @NotNull
    private CategoryDto category;

}
