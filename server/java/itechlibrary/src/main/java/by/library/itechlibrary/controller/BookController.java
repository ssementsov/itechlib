package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.book.BookAndIsReaderDto;
import by.library.itechlibrary.dto.book.BookDto;
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
    public BookAndIsReaderDto getBookById(@PathVariable("id") long id) {

        return bookService.findByIdWithIsReader(id);
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

    @PutMapping("/status/update")
    @ApiOperation("update book status by owner")
    @ResponseStatus(HttpStatus.OK)
    public BookDto updateStatusByOwner(@RequestParam("status") String status, @RequestParam("bookId") long bookId) {

        return bookService.updateStatus(status, bookId);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("delete book by id")
    @ResponseStatus(HttpStatus.OK)
    public void removeBook(@PathVariable long id) {

        bookService.remove(id);
    }
}
