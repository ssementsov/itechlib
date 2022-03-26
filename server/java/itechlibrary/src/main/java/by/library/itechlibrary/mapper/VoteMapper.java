package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.entity.vote.Vote;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VoteMapper {

    @Named(value = "vote")
    VoteDto toVoteDto(Vote vote);

    @Named(value = "voteDto")
    Vote toVote(VoteDto voteDto);

    @IterableMapping(qualifiedByName = "vote")
    List<VoteDto> mapVoteDtoList(List<Vote> votes);

    @IterableMapping(qualifiedByName = "voteDto")
    List<Vote> mapVoteList(List<VoteDto> voteDtos);

}