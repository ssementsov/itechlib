package by.library.itechlibrary.controller;

import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/books")
@Api(tags = "Endpoints for books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    @ApiOperation("get all books")
    @ResponseStatus(HttpStatus.OK)
    public List<Book> getBooks() {

        return bookService.findAll();
    }

    @GetMapping("/{id}")
    @ApiOperation("get all books")
    @ResponseStatus(HttpStatus.OK)
    public Book getBookById(@PathVariable("id") long id) {

        return bookService.findById(id);
    }


    @PostMapping
    @ApiOperation("create new book")
    @ResponseStatus(HttpStatus.CREATED)
    public void sendMessage(@Valid @RequestBody Book book) {

       bookService.addBook(book);
    }
}
