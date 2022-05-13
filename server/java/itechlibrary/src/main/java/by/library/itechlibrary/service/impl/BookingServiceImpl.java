package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.BookingConstant;
import by.library.itechlibrary.constant.StatusConstant;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.entity.*;
import by.library.itechlibrary.entity.bookinginfo.BaseBookingInfo;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.exeption_handler.exception.*;
import by.library.itechlibrary.mapper.BookingMapper;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.repository.BookingRepository;
import by.library.itechlibrary.service.BookingService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.math3.util.Precision;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    private final BookingMapper bookingMapper;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final BookRepository bookRepository;


    @Override
    public List<BookingResponseDto> findAllByReaderId(long id) {

        log.info("Try to find bookings by reader id = {}.", id);

        List<Booking> bookings = bookingRepository.findAllByReaderId(id);

        return bookingMapper.mapBookingResponseDtoList(bookings);
    }

    @Transactional
    @Override
    public BookingResponseDto save(BookingDto bookingDto) {

        if (bookingDto.getId() == 0) {

            log.info("Try to map bookingDto and save booking.");

            Booking booking = bookingMapper.toBookingFromBookingDto(bookingDto);
            checkAndSetDates(booking);
            setCurrentUser(booking);
            checkLimitOfActiveBookings(booking.getReader().getId());
            setBookAndChangeStatus(booking, StatusConstant.IN_USE_BOOK_STATUS);

            booking = bookingRepository.save(booking);

            return bookingMapper.toNewBookingResponseDto(booking);

        } else {

            throw new WrongDtoDataException("Wrong BookingDto id," +
                    " when saving new booking, id should be equals 0.");

        }
    }

    @Override
    public List<BookingResponseDto> findAllByBookId(long bookId) {

        log.info("Try to find bookings by book id = {}.", bookId);

        List<Booking> bookings = bookingRepository.findAllByBookId(bookId);

        return bookingMapper.mapBookingResponseDtoList(bookings);
    }

    @Override
    public BookingResponseDto findCurrentByBookId(long bookId) {

        Booking currentBooking = findByBookingId(bookId);

        return bookingMapper.toNewBookingResponseDto(currentBooking);
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

            booking.getBook().setStatus(StatusConstant.AVAILABLE_BOOK_STATUS);
            booking.setActive(false);
            setReviewInfo(booking, reviewDto.getRate(), reviewDto.getFeedback());
            bookingRepository.save(booking);

        } else {

            throw new NotActiveBookingException("Booking with id = " + id + " is not active now.");

        }
    }

    @Override
    public BookingInfo getBookingInfo(long bookId) {

        log.info("Try to find active booking by book id = {}", bookId);

        Optional<Booking> bookingOptional = getActiveByBookId(bookId);

        return checkAndBuildBookingInfo(bookId, bookingOptional);
    }

    @Override
    public BaseBookingInfo getBaseBookingInfo(long bookId) {

        Optional<Booking> bookingOptional = getActiveByBookId(bookId);

        if (bookingOptional.isPresent()) {

            BaseBookingInfo baseBookingInfo = new BaseBookingInfo();
            baseBookingInfo.setBookingEndDate(bookingOptional.get().getFinishDate());

            return baseBookingInfo;

        } else throw new NotActiveBookingException("Active booking has not found for book id " + bookId);
    }

    @Transactional
    @Override
    public void disableCurrentBooking(long bookId) {

        Optional<Booking> bookingOptional = getActiveByBookId(bookId);

        if (bookingOptional.isPresent()) {

            Booking booking = bookingOptional.get();
            booking.setActive(false);

        }
    }

    private Optional<Booking> getActiveByBookId(long bookId) {

        return bookingRepository.findByBookIdAndActiveIsTrue(bookId);

    }

    private BookingInfo checkAndBuildBookingInfo(long bookId, Optional<Booking> bookingOptional) {

        if (bookingOptional.isPresent()) {

            BookingInfo bookingInfo = new BookingInfo();

            Booking currentBooking = bookingOptional.get();
            setFullNameReaderToBookingInfo(bookingInfo, currentBooking);
            checkAndSetCurrentUserIsReader(bookingInfo, currentBooking);
            bookingInfo.setBookingEndDate(currentBooking.getFinishDate());

            return bookingInfo;

        } else throw new NotActiveBookingException("Active booking has not found for book id " + bookId);
    }

    private void checkAndSetCurrentUserIsReader(BookingInfo bookingInfo, Booking booking) {

        if (securityUserDetailsService.getCurrentUserId() == booking.getReader().getId()) {

            bookingInfo.setCurrentUserReader(true);
        }
    }

    private void setFullNameReaderToBookingInfo(BookingInfo bookingInfo, Booking booking) {

        String fullNameOfReader = booking.getReader().getName() + " " + booking.getReader().getSurname();
        bookingInfo.setNameOfReader(fullNameOfReader);

    }

    private Booking findByBookingId(long bookId) {

        log.info("Try to find current booking by book id = {}.", bookId);

        return bookingRepository.findByBookIdAndActiveIsTrue(bookId)
                .orElseThrow(() -> new NotFoundException("Not found active booking by book id = " + bookId));

    }

    private void setReviewInfo(Booking booking, Short rate, String feedbackText) {

        if (rate != null) {

            booking.setRate(rate);
            recountingBookRate(booking);

        }

        if (feedbackText != null && !feedbackText.equals("")) {

            Feedback feedback = new Feedback();
            feedback.setText(feedbackText);
            feedback.setDate(LocalDate.now());
            booking.setFeedback(feedback);

        }
    }

    private void checkLimitOfActiveBookings(long userId){

        List<Booking> bookings = bookingRepository.findByReaderIdAndActiveIsTrue(userId);

        if(bookings.size() >= BookingConstant.ACTIVE_BOOKINGS_LIMIT){

            log.info("Number of active bookings is exceeded");

            throw new BookingBookLimitException("You can have maximum count active bookings.");

        }
    }

    private void recountingBookRate(Booking booking) {

        List<Short> rateList = bookingRepository.getRatesByBookId(booking.getBook().getId());
        int sumOfRate = rateList.stream().mapToInt(a -> a).sum();
        int countOfRates = rateList.size();
        double bookRate = (double) sumOfRate / countOfRates;
        double bookRateRounded = Precision.round(bookRate, 1);
        booking.getBook().setRate(bookRateRounded);

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

    private void setBookAndChangeStatus(Booking booking, BookStatus bookStatus) {

        long bookId = booking.getBook().getId();
        Book book = bookRepository
                .findById(bookId).orElseThrow(() -> new NotFoundException("Book was not find!!!"));

        if (book.getStatus().getName().equals(StatusConstant.AVAILABLE)) {

            book.setStatus(bookStatus);
            booking.setBook(book);

        } else {

            throw new BookingBookException("Book is not available or in use now");

        }
    }
}

