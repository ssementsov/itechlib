package by.library.itechlibrary.controller;

import by.library.itechlibrary.dto.booking.NewBookingDto;
import by.library.itechlibrary.dto.booking.NewBookingResponseDto;
import by.library.itechlibrary.service.BookingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
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
@PreAuthorize(value = "isAuthenticated()")
public class BookingController {

    private final BookingService bookingService;


    @GetMapping("/{readerId}")
    @ApiOperation("get all reader's bookings")
    @ResponseStatus(HttpStatus.OK)
    public List<NewBookingDto> getBookingsByReaderId(@PathVariable("readerId") long readerId) {

        return bookingService.findAllByReaderId(readerId);
    }

    @GetMapping("/{readerId}/current")
    @ApiOperation("get all reader's current bookings")
    @ResponseStatus(HttpStatus.OK)
    public List<NewBookingDto> getCurrentBookingsByReaderId(@PathVariable("readerId") long readerId) {

        return bookingService.findAllCurrentsByReaderId(readerId);
    }

    @GetMapping("/{bookId}")
    @ApiOperation("get all book's bookings")
    @ResponseStatus(HttpStatus.OK)
    public List<NewBookingDto> getBookingsByBooksId(@PathVariable("bookId") long readerId) {

        return bookingService.findAllByBookId(readerId);
    }

    @GetMapping("/{id}")
    @ApiOperation("get booking by id")
    @ResponseStatus(HttpStatus.OK)
    public NewBookingDto getBookingById(@PathVariable("id") long id) {

        return bookingService.findById(id);
    }

    @PostMapping
    @ApiOperation("create new booking")
    @ResponseStatus(HttpStatus.CREATED)
    public NewBookingResponseDto addBook(@Valid @RequestBody NewBookingDto newBookingDto) {

        return bookingService.saveBooking(newBookingDto);
    }

    @PutMapping("/update-finish-date")
    @ApiOperation("update booking")
    @ResponseStatus(HttpStatus.OK)
    public NewBookingDto updateBook(@RequestParam("bookingId") long bookingId,
                                    @RequestParam("newFinishDate") LocalDate newFinishDate) {

        return bookingService.updateFinishDate(bookingId, newFinishDate);
    }
}
