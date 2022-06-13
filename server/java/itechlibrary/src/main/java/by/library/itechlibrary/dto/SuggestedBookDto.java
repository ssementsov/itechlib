package by.library.itechlibrary.dto;

import by.library.itechlibrary.dto.vote.GeneralAmountVoteDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
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

    private String link;

    private LocalDateTime createDate;

    private LanguageDto language;

    private CategoryDto category;

    private SuggestedBookStatusDto status;

    private UserDto creator;

    private GeneralAmountVoteDto amountVote;

}
