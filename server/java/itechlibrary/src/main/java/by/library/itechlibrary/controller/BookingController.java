package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.FeedbackResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.service.BookingService;
import by.library.itechlibrary.service.FeedbackService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@Api(tags = "Endpoints for booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    private final FeedbackService feedbackService;


    @GetMapping("/readers/{readerId}")
    @ApiOperation("get all reader's bookings")
    @ResponseStatus(HttpStatus.OK)
    public List<BookingResponseDto> getBookingsByReaderId(@PathVariable("readerId") long readerId) {

        return bookingService.findAllByReaderId(readerId);
    }

    @GetMapping("/readers/{readerId}/count")
    public int getCountActiveBookings(@PathVariable("readerId") long readerId){

        return bookingService.getCountActiveBookings(readerId);

    }

    @GetMapping("/{readerId}/current")
    @ApiOperation("get all reader's current bookings")
    @ResponseStatus(HttpStatus.OK)
    public List<BookingResponseDto> getCurrentBookingsByReaderId(@PathVariable("readerId") long readerId) {

        return bookingService.findAllCurrentsByReaderId(readerId);
    }

    @GetMapping("books/{bookId}")
    @ApiOperation("get all book's bookings")
    @ResponseStatus(HttpStatus.OK)
    public List<BookingResponseDto> getBookingsByBooksId(@PathVariable("bookId") long bookId) {

        return bookingService.findAllByBookId(bookId);
    }

    @GetMapping
    @ApiOperation("get current booking by book id.")
    @ResponseStatus(HttpStatus.OK)
    public BookingResponseDto getActiveBookingByBookId(@RequestParam("bookId") long bookId) {

        return bookingService.findCurrentByBookId(bookId);
    }

    @GetMapping("/{id}")
    @ApiOperation("get booking by id")
    @ResponseStatus(HttpStatus.OK)
    public BookingResponseDto getBookingById(@PathVariable("id") long id) {

        return bookingService.findById(id);
    }

    @PreAuthorize("hasRole('BOOK_READER')")
    @PostMapping
    @ApiOperation("create new booking")
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponseDto addBook(@Valid @RequestBody BookingDto bookingDto) {

        return bookingService.save(bookingDto);
    }

    @PreAuthorize("hasRole('BOOK_READER')")
    @PutMapping("/finish-date")
    @ApiOperation("update booking finish date")
    @ResponseStatus(HttpStatus.OK)
    public BookingResponseDto updateBookingFinishDate(@RequestParam("bookingId") long bookingId,
                                                      @RequestParam("newFinishDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate newFinishDate) {

        return bookingService.updateFinishDate(bookingId, newFinishDate);
    }

    @PostMapping("/{id}/return")
    @ApiOperation("return book, make current booking not active")
    @ResponseStatus(HttpStatus.CREATED)
    public void returnBookSetReview(@RequestBody ReviewDto reviewDto, @PathVariable("id") long bookingId) {

        bookingService.returnBooking(reviewDto, bookingId);

    }

    @GetMapping("/feedback")
    @ApiOperation("get feedback list by book id")
    @ResponseStatus(HttpStatus.OK)
    public List<FeedbackResponseDto> getFeedbackListByBookId(@RequestParam("bookId") long bookId,
                                                             SortingCriteria sortingCriteria) {

        return feedbackService.getAll(sortingCriteria, bookId);
    }
}

