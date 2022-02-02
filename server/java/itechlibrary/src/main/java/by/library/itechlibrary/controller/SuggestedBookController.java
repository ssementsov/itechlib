package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.SuggestedBookDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.service.BookService;
import by.library.itechlibrary.service.SuggestedBookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/suggested-books")
@Api(tags = "Endpoints for suggested books")
@RequiredArgsConstructor
public class SuggestedBookController {

    private final SuggestedBookService suggestedBookService;

    @GetMapping
    @ApiOperation("get all suggested books")
    @ResponseStatus(HttpStatus.OK)
    public List<SuggestedBookDto> getBooks() {

        return suggestedBookService.getAll();
    }

    @GetMapping("/{id}")
    @ApiOperation("get suggested book by id")
    @ResponseStatus(HttpStatus.OK)
    public SuggestedBookDto getBookById(@PathVariable("id") long id) {

        return suggestedBookService.getById(id);
    }


    @PostMapping
    @ApiOperation("create new suggested book")
    @ResponseStatus(HttpStatus.CREATED)
    public SuggestedBookDto addBook(@Valid @RequestBody SuggestedBookDto suggestedBookDto) {

        return suggestedBookService.create(suggestedBookDto);
    }

    @PutMapping
    @ApiOperation("update suggested book")
    @ResponseStatus(HttpStatus.OK)
    public SuggestedBookDto updateBook(@Valid @RequestBody SuggestedBookDto suggestedBookDto) {

        return suggestedBookService.update(suggestedBookDto);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("delete suggested book by id")
    @ResponseStatus(HttpStatus.OK)
    public void removeBook(@PathVariable long id) {

        suggestedBookService.remove(id);
    }
}
