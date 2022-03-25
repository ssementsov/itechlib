package by.library.itechlibrary.dto.vote;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteDto {

    private long id;

    private VoteTypeDto voteType;

    private VoteObjectTypeDto voteObjectType;

    private long voteObjectId;

}
