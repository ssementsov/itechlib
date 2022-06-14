package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.vote.VoteDto;
import by.library.itechlibrary.fasade.SuggestedBookVoteFacade;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/vote")
@Api(tags = "Vote controller")
@RequiredArgsConstructor
public class VoteController {

    private final SuggestedBookVoteFacade suggestedBookVoteFacade;


    @PreAuthorize("hasRole('BOOK_READER')")
    @PostMapping
    @ApiOperation("vote endpoint")
    @ResponseStatus(HttpStatus.CREATED)
    public void vote(@Valid @RequestBody VoteDto voteDto) {

        suggestedBookVoteFacade.vote(voteDto);

    }
}
