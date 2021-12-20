package by.library.itechlibrary.dto;

import by.library.itechlibrary.entity.Category;
import by.library.itechlibrary.entity.Language;
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
    private Language language;

    @NotNull
    private Category category;

    @NotNull
    private StatusDto status;

}
