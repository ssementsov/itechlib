package by.library.itechlibrary.dto.suggested_book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuggestedBookVoteCounterDto {

    private int positiveCount;
    private int negativeCount;
    private String currentUserVoteType;

}