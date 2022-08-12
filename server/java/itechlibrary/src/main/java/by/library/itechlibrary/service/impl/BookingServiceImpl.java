package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.BookingConstant;
import by.library.itechlibrary.constant.StatusConstant;
import by.library.itechlibrary.constant.UserRoleConstant;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingForTargetReaderDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Feedback;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.UserRole;
import by.library.itechlibrary.entity.bookinginfo.BaseBookingInfo;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.exeption_handler.exception.BookingBookException;
import by.library.itechlibrary.exeption_handler.exception.BookingBookLimitException;
import by.library.itechlibrary.exeption_handler.exception.NotActiveBookingException;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongDateException;
import by.library.itechlibrary.exeption_handler.exception.WrongDtoDataException;
import by.library.itechlibrary.mapper.BookingMapper;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.repository.BookingRepository;
import by.library.itechlibrary.service.BookingService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.math3.util.Precision;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    private final BookingMapper bookingMapper;

    private final BookRepository bookRepository;

    private final EntityManager entityManager;


    @Override
    public List<BookingResponseDto> findAllByReaderId(long id) {

        log.info("Try to find bookings by reader id = {}.", id);

        List<Booking> bookings = bookingRepository.findAllByReaderId(id);

        return bookingMapper.mapBookingResponseDtoList(bookings);
    }

    @Transactional
    @Override
    public BookingResponseDto save(BookingDto bookingDto, long readerId) {

        if (bookingDto.getId() == 0) {

            log.info("Try to map bookingDto and save booking.");

            Booking booking = bookingMapper.toBookingFromBookingDto(bookingDto);
            checkAndSetDates(booking);
            setReader(booking, readerId);
            checkLimitOfActiveBookings(booking.getReader().getId());
            setBookAndChangeItsStatus(booking);

            booking = bookingRepository.save(booking);

            return bookingMapper.toNewBookingResponseDto(booking);

        } else {

            throw new WrongDtoDataException("Wrong BookingDto id," +
                    " when saving new booking, id should be equals 0.");

        }
    }

    @Transactional
    @Override
    public Optional<Booking> save(WithOwnerBookDto bookDto, BookingForTargetReaderDto bookingForTargetReaderDto) {

        if (bookDto.getStatus().getName().equals(StatusConstant.ACCEPTANCE_AWAITING)) {

            log.info("Try to map bookingForTargetReaderDto and save booking.");

            Booking booking = bookingMapper
                    .toBookingFromBookingForTargetReaderDto(bookingForTargetReaderDto, bookDto.getId());

            checkAndSetDates(booking);
            checkLimitOfActiveBookings(booking.getReader().getId());
            setBookAndChangeItsStatus(booking);

            booking = bookingRepository.saveAndFlush(booking);
            entityManager.refresh(booking);
            return Optional.of(booking);

        } else {

            return Optional.empty();
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

    @Override
    public Booking findByIdWithoutMapping(long id) {

        log.info("Try to find booking by id = {}.", id);

        return findBookingById(id);
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

        log.info("Try to return booking, make active is false.");

        Booking booking = findBookingById(id);
        tryToReturnBooking(reviewDto, id, booking);

    }

    @Override
    public BookingInfo getBookingInfo(long bookId, long currentUserId) {

        log.info("Try to find active booking by book id = {}", bookId);

        Optional<Booking> bookingOptional = getActiveByBookId(bookId);

        return checkAndBuildBookingInfo(bookId, bookingOptional, currentUserId);
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

    @Override
    public int getCountActiveBookings(long readerId) {

        log.info("Try get count of active bookings of reader.");

        return bookingRepository.findCountByReaderIdAndActiveIsTrue(readerId);
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

    private void tryToReturnBooking(ReviewDto reviewDto, long id, Booking booking) {

        if (booking.isActive()) {

            booking.getBook().setStatus(StatusConstant.AVAILABLE_BOOK_STATUS);
            checkAndSetUserRoles(booking);
            booking.setActive(false);
            setReviewInfo(booking, reviewDto.getRate(), reviewDto.getFeedback());

            bookingRepository.save(booking);

        } else {

            throw new NotActiveBookingException("Booking with id = " + id + " is not active now.");

        }
    }

    private void checkAndSetUserRoles(Booking booking) {

        Set<UserRole> roles = booking.getReader().getRoles();
        int countOfOverdueBookings = bookingRepository.findByReaderIdAndFinishDateBeforeAndActiveIsTrue(booking.getReader().getId());

        if (!(roles.contains(UserRoleConstant.BOOK_READER_ROLE)) &&
                countOfOverdueBookings == BookingConstant.MINIMUM_COUNT_OVERDUE_BOOKINGS) {

            roles.add(UserRoleConstant.BOOK_READER_ROLE);
            booking.getReader().setRoles(roles);

        }
    }

    private Optional<Booking> getActiveByBookId(long bookId) {

        return bookingRepository.findByBookIdAndActiveIsTrue(bookId);

    }

    private BookingInfo checkAndBuildBookingInfo(long bookId, Optional<Booking> bookingOptional, long currentUserId) {

        if (bookingOptional.isPresent()) {

            BookingInfo bookingInfo = new BookingInfo();

            Booking currentBooking = bookingOptional.get();
            setFullNameReaderToBookingInfo(bookingInfo, currentBooking);
            checkAndSetCurrentUserIsReader(bookingInfo, currentBooking.getReader().getId(), currentUserId);
            bookingInfo.setBookingEndDate(currentBooking.getFinishDate());

            return bookingInfo;

        } else throw new NotActiveBookingException("Active booking has not found for book id " + bookId);
    }

    private void checkAndSetCurrentUserIsReader(BookingInfo bookingInfo, long bookingReaderId, long currentUserId) {

        if (currentUserId == bookingReaderId) {

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

        if (rate != null && rate != (short) 0) {

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

    private void checkLimitOfActiveBookings(long userId) {

        List<Booking> bookings = bookingRepository.findByReaderIdAndActiveIsTrue(userId);

        if (bookings.size() >= BookingConstant.ACTIVE_BOOKINGS_LIMIT) {

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

    private void setReader(Booking booking, long readerId) {

        log.info("Try to find current user and set to booking");

        User user = new User();
        user.setId(readerId);
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

    private void setBookAndChangeItsStatus(Booking booking) {

        long bookId = booking.getBook().getId();
        Book book = bookRepository
                .findById(bookId).orElseThrow(() -> new NotFoundException("Book was not find!!!"));

        String bookStatusName = book.getStatus().getName();

        if (book.getStatus().getName().equals(StatusConstant.AVAILABLE)) {

            book.setStatus(StatusConstant.IN_USE_BOOK_STATUS);
            booking.setBook(book);

        } else if (bookStatusName.equals(StatusConstant.ACCEPTANCE_AWAITING)) {

            booking.setBook(book);

        } else {

            throw new BookingBookException("Book is not available or in use now");

        }
    }
}