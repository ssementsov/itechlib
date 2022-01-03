package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.BookDto;
import by.library.itechlibrary.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public List<BookDto> getBooks() {

        return bookService.findAll();
    }

    @GetMapping("/{id}")
    @ApiOperation("get book by id")
    @ResponseStatus(HttpStatus.OK)
    public BookDto getBookById(@PathVariable("id") long id) {

        return bookService.findById(id);
    }

    @GetMapping("/user/{id}")
    @ApiOperation("get book by owner id")
    @ResponseStatus(HttpStatus.OK)
    public List<BookDto> getBooksByUserId(@PathVariable("id") long id) {

        return bookService.findByUserId(id);
    }

    @PostMapping
    @ApiOperation("create new book")
    @ResponseStatus(HttpStatus.CREATED)
    public BookDto addBook(@Valid @RequestBody BookDto bookDto) {

        return bookService.saveBook(bookDto);
    }

    @PutMapping
    @ApiOperation("update book")
    @ResponseStatus(HttpStatus.OK)
    public BookDto updateBook(@Valid @RequestBody BookDto bookDto) {

        return bookService.saveBook(bookDto);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("delete book by id")
    @ResponseStatus(HttpStatus.OK)
    public void removeBook(@PathVariable long id) {

        bookService.remove(id);
    }
}
