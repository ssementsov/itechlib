package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.BookingConstant;
import by.library.itechlibrary.constant.StatusConstant;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Status;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.*;
import by.library.itechlibrary.mapper.BookingMapper;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.repository.BookingRepository;
import by.library.itechlibrary.service.BookService;
import by.library.itechlibrary.service.BookingService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    private final BookingMapper bookingMapper;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final BookService bookService;

    private final BookRepository bookRepository;


    @Override
    public List<BookingResponseDto> findAllByReaderId(long id) {

        log.info("Try to find bookings by reader id = {}.", id);

        List<Booking> bookings = bookingRepository.findAllByReaderId(id);

        return bookingMapper.mapBookingResponseDtoList(bookings);
    }

    @Transactional
    @Override
    public BookingResponseDto saveBooking(BookingDto bookingDto) {

        if (bookingDto.getId() == 0) {

            log.info("Try to map bookingDto and save booking.");

            Booking booking = bookingMapper.toBookingFromBookingDto(bookingDto);
            checkAndSetDates(booking);
            setCurrentUser(booking);
            setBookAndChangeStatus(booking, StatusConstant.IN_USE_STATUS);

            booking = bookingRepository.save(booking);

            return bookingMapper.toNewBookingResponseDto(booking);

        } else {

            throw new WrongDtoDataException("Wrong BookingDto id," +
                    " when saving new booking, id should be equals 0.");

        }
    }

    @Override
    public List<BookingResponseDto> findAllByBookId(long id) {

        log.info("Try to find bookings by book id = {}.", id);

        List<Booking> bookings = bookingRepository.findAllByBookId(id);

        return bookingMapper.mapBookingResponseDtoList(bookings);
    }

    @Override
    public List<BookingResponseDto> findAllCurrentsByReaderId(long id) {

        log.info("Try to find current bookings by reader id = {}.", id);

        List<Booking> bookings = bookingRepository
                .findAllByReaderIdAndCurrentDate(LocalDate.now(), id);

        return bookingMapper.mapBookingResponseDtoList(bookings);
    }

    @Override
    public BookingResponseDto findById(long id) {

        log.info("Try to find booking by id = {}.", id);

        Booking booking = findBookingById(id);

        return bookingMapper.toNewBookingResponseDto(booking);
    }

    @Transactional
    @Override
    public BookingResponseDto updateFinishDate(long bookingId, LocalDate newFinishDate) {

        Booking booking = findBookingById(bookingId);
        checkFinishDate(booking.getStartDate(), newFinishDate);
        booking.setFinishDate(newFinishDate);
        booking = bookingRepository.save(booking);

        return bookingMapper.toNewBookingResponseDto(booking);
    }

    @Transactional
    @Override
    public void returnBooking(ReviewDto reviewDto, long id) {

        Booking booking = findBookingById(id);

        if (booking.isActive()) {

            booking.getBook().setStatus(StatusConstant.AVAILABLE_STATUS);
            booking.setActive(false);
            setReviewInfo(booking, reviewDto.getRate(), reviewDto.getFeedback());
            bookingRepository.save(booking);

        }else{

            throw new NotActiveBookingException("Booking with id = " + id + " is not active now.");

        }
    }

    private void setReviewInfo(Booking booking, Short rate, String feedback) {

        if (rate != null && rate != 0) {

            booking.setRate(rate);

        }

        if (feedback != null && !feedback.equals("")) {

            booking.setFeedback(feedback);

        }
    }

    private Booking findBookingById(long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("The booking was not find by id = " + id));

    }


    private void checkAndSetDates(Booking booking) {

        checkAndSetStartDate(booking);
        checkFinishDate(booking.getStartDate(), booking.getFinishDate());

    }

    private void setCurrentUser(Booking booking) {

        log.info("Try to find current user and set to booking");

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        User user = new User();
        user.setId(currentUserId);
        booking.setReader(user);

    }

    private void checkAndSetStartDate(Booking booking) {

        LocalDate currentDate = LocalDate.now();

        if (booking.getStartDate() == null || !booking.getStartDate().isEqual(currentDate)) {

            booking.setStartDate(currentDate);

            log.info("start date should be equals current date. " +
                    "Start date has been changed to the current");

        }
    }

    private void checkFinishDate(LocalDate startDate, LocalDate finishDate) {

        LocalDate maxDate = startDate.plusMonths(BookingConstant.MONTH_COUNT);
        LocalDate currentDate = LocalDate.now();

        if (maxDate.isBefore(finishDate) || currentDate.isAfter(finishDate) || startDate.isAfter(finishDate)) {

            throw new WrongDateException("Finish the date must not exceed a month from the start date." +
                    " And current date and start date should be before finish date.");

        }
    }

    private void setBookAndChangeStatus(Booking booking, Status status) {

        long bookId = booking.getBook().getId();
        Book book = bookRepository
                .findById(bookId).orElseThrow(() -> new NotFoundException("Book was not find!!!"));

        if (book.getStatus().getName().equals(StatusConstant.AVAILABLE)) {

            book.setStatus(status);
            booking.setBook(book);

        } else {

            throw new BookingBookException("Book is not available or in use now");

        }
    }
}

