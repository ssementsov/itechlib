package by.library.itechlibrary.dto;

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

    @NotNull
    private LanguageDto language;

    @NotNull
    private CategoryDto category;

    @NotNull
    private StatusDto status;

}
