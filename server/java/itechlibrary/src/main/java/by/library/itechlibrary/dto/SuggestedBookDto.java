package by.library.itechlibrary.dto;

import by.library.itechlibrary.dto.vote.GeneralAmountVoteDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

    private GeneralAmountVoteDto amountVote;

}
