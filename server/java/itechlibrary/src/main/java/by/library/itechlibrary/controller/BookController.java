package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.ResponseOwnBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.dto.booking.BookingForTargetReaderDto;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.facade.BookFacade;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/books")
@Api(tags = "Endpoints for books")
@RequiredArgsConstructor
public class BookController {

    private final BookFacade bookFacade;

    @GetMapping
    @ApiOperation("get all books")
    @ResponseStatus(HttpStatus.OK)
    public List<WithOwnerBookDto> getBooks(SortingCriteria sortingCriteria) {

        return bookFacade.getAll(sortingCriteria);
    }

    @GetMapping("/{id}")
    @ApiOperation("get book by id")
    @ResponseStatus(HttpStatus.OK)
    public FullBookDto getBookById(@PathVariable("id") long id) {

        return bookFacade.getByIdFullVersion(id);
    }

    @GetMapping("/users")
    @ApiOperation("get owners books")
    @ResponseStatus(HttpStatus.OK)
    public List<WithOwnerBookDto> getUsersBook(SortingCriteria sortingCriteria) {

        return bookFacade.getOwnersBook(sortingCriteria);
    }

    @GetMapping("/users/bookings")
    @ApiOperation("get current users booked books")
    @ResponseStatus(HttpStatus.OK)
    public List<ResponseOwnBookDto> getCurrentUsersBookedBooks() {

        return bookFacade.getCurrentUsersBookedBooks();
    }

    @PreAuthorize("hasRole('BOOK_READER')")
    @PostMapping
    @ApiOperation("create new book")
    @ResponseStatus(HttpStatus.CREATED)
    public WithOwnerBookDto addBook(@Valid @RequestPart WithOwnerBookDto withOwnerBookDto,
                                    @Valid @RequestPart(required = false) BookingForTargetReaderDto bookingForTargetReaderDto,
                                    @RequestPart(value = "file", required = false) MultipartFile multipartFile) {

        return bookFacade.save(withOwnerBookDto, bookingForTargetReaderDto, multipartFile);
    }


    @PutMapping
    @ApiOperation("update book")
    @ResponseStatus(HttpStatus.OK)
    public FullBookDto updateBook(@Valid @RequestBody WithOwnerBookDto withOwnerBookDto) {

        return bookFacade.update(withOwnerBookDto);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("delete book by id")
    @ResponseStatus(HttpStatus.OK)
    public void removeBook(@PathVariable long id) {

        bookFacade.remove(id);

    }

    @PutMapping(path = "/photo")
    @ApiOperation("attach photo to book")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateImageBook(@RequestPart(value = "file") final MultipartFile multipartFile,
                                @RequestPart(name = "bookId") long bookId) {

        bookFacade.attachFile(multipartFile, bookId);

    }

    @DeleteMapping(path = "/{fileId}/photo")
    @ApiOperation("removed photo to book by file id")
    @ResponseStatus(HttpStatus.OK)
    public void removedPhotoBook(@PathVariable long fileId) {

        bookFacade.removedAttachedFile(fileId);

    }
}