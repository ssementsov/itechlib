package by.library.itechlibrary.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class SuggestedBookDto {

    private long id;

    @NotNull
    private String title;

    private String author;

    private String comment;

    private String link;

    private LocalDate createDate;

    private LanguageDto language;

    private CategoryDto category;

    private SuggestedBookStatusDto status;

    private UserDto creator;

}
