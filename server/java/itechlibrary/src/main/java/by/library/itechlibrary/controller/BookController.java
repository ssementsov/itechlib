package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/books")
@Api(tags = "Endpoints for books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    @ApiOperation("get all books")
    @ResponseStatus(HttpStatus.OK)
    public List<WithOwnerBookDto> getBooks() {

        return bookService.findAll();
    }

    @GetMapping("/{id}")
    @ApiOperation("get book by id")
    @ResponseStatus(HttpStatus.OK)
    public FullBookDto getBookById(@PathVariable("id") long id) {

        return bookService.findByIdFullVersion(id);
    }

    @GetMapping("/user/")
    @ApiOperation("get owners books")
    @ResponseStatus(HttpStatus.OK)
    public List<WithOwnerBookDto> getBooksByUserId() {

        return bookService.findOwnersBook();
    }

    @PostMapping
    @ApiOperation("create new book")
    @ResponseStatus(HttpStatus.CREATED)
    public WithOwnerBookDto addBook(@Valid @RequestBody WithOwnerBookDto withOwnerBookDto) {

        return bookService.save(withOwnerBookDto);
    }

    @PutMapping
    @ApiOperation("update book")
    @ResponseStatus(HttpStatus.OK)
    public FullBookDto updateBook(@Valid @RequestBody WithOwnerBookDto withOwnerBookDto) {

        return bookService.update(withOwnerBookDto);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("delete book by id")
    @ResponseStatus(HttpStatus.OK)
    public void removeBook(@PathVariable long id) {

        bookService.remove(id);
    }

    @PostMapping(path = "/attach-photo")
    @ApiOperation("attach photo to book")
    @ResponseStatus(HttpStatus.CREATED)
    public void addPhotoBook(@RequestPart(value = "file") final MultipartFile multipartFile,
                             @RequestPart(name = "bookId") long bookId) {

        bookService.attachFile(multipartFile, bookId);

    }

    @DeleteMapping(path = "/{fileId}/removed-photo")
    @ApiOperation("removed photo to book by file id")
    @ResponseStatus(HttpStatus.OK)
    public void removedPhotoBook(@PathVariable long fileId) {

        bookService.removedAttachedFile(fileId);

    }
}
