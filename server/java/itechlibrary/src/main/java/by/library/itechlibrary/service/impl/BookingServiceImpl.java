package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.BookStatusConstant;
import by.library.itechlibrary.constant.BookingConstant;
import by.library.itechlibrary.constant.BookingStatusConstant;
import by.library.itechlibrary.constant.UserRoleConstant;
import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.BookingStatusDto;
import by.library.itechlibrary.dto.book.WithBookingInfoBookDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingForTargetReaderDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.dto.booking.bookinginfo.BookingInfoDto;
import by.library.itechlibrary.entity.*;
import by.library.itechlibrary.entity.bookinginfo.BaseBookingInfo;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.exeption_handler.exception.*;
import by.library.itechlibrary.mapper.BookingInfoMapper;
import by.library.itechlibrary.mapper.BookingMapper;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.repository.BookingAcceptanceRepository;
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
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    private final BookingMapper bookingMapper;

    private final BookRepository bookRepository;

    private final BookingAcceptanceRepository bookingAcceptanceRepository;

    private final BookingInfoMapper bookingInfoMapper;


    private final EntityManager entityManager;


    @Override
    public List<BookingResponseDto> findAllByReaderId(long id) {

        log.info("Try to find bookings by reader id = {}.", id);

        List<Booking> bookings = bookingRepository.findAllByReaderId(id);

        return bookingMapper.mapBookingResponseDtoList(bookings);
    }

    @Transactional
    @Override
    public BookingResponseDto save(BookingDto bookingDto, Book book, long readerId) {

        if (bookingDto.getId() == 0) {

            log.info("Try to map bookingDto and save booking.");

            Booking booking = bookingMapper.toBookingFromBookingDto(bookingDto);
            fillBookingFields(booking, book, readerId);
            booking = getSavedAndRefreshed(booking);

            return bookingMapper.toNewBookingResponseDto(booking);

        } else {

            throw new WrongDtoDataException("Wrong BookingDto id," +
                    " when saving new booking, id should be equals 0.");

        }
    }

    @Transactional
    @Override
    public BookingDto update(BookingDto bookingDto, Book book, long readerId) {

        Booking booking = bookingMapper.toBookingFromBookingDto(bookingDto);

        booking = updateBooking(booking, book, readerId);

        return bookingMapper.toBookingDtoFromBooking(booking);
    }

    @Transactional
    @Override
    public Booking resolveAssignedBooking(Booking booking, Book book, BookingStatusDto bookingStatusDto, long readerId) {

        BookingStatus bookingStatus = bookingMapper.toBookingStatusFromBookingStatusDto(bookingStatusDto);
        booking.setStatus(bookingStatus);

        return updateBooking(booking, book, readerId);
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
    public Booking findAwaitingConfirmationByBookId(long bookId) {

        return bookingRepository.findAwaitingConfirmationByBookId(bookId)
                .orElseThrow(() -> new NotFoundException(
                        String.format("Can't find a booking waiting for confirmation for a book with id %d.", bookId)
                ));
    }

    @Override
    public void checkDtoForResolveAssignedBooking(BookingAcceptanceDto acceptanceDto) {

        String bookingStatusName = acceptanceDto.getStatus().getName();
        String comment = acceptanceDto.getComment();

        if (!bookingStatusName.equals(BookingStatusConstant.ACCEPTED) && !bookingStatusName.equals(BookingStatusConstant.DECLINED)) {

            throw new WrongBookingStatusException("The booking status must be accepted or declined for the booking assignment to be resolved.");

        }

        if (Objects.isNull(comment) && bookingStatusName.equals(BookingStatusConstant.DECLINED)) {

            throw new WrongDtoDataException("The comment must be correct when declining the assigned booking.");

        }

        if (Objects.nonNull(comment) && bookingStatusName.equals(BookingStatusConstant.ACCEPTED)) {

            throw new WrongDtoDataException("The comment should be absent when accepting the assigned booking.");

        }

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
    public Booking returnBooking(ReviewDto reviewDto, long id) {

        log.info("Try to return booking, make active is false.");

        Booking booking = findBookingById(id);
        tryToReturnBooking(reviewDto, id, booking);

        return booking;
    }

    @Override
    public BookingInfo getBookingInfo(long bookId, long currentUserId) {

        return getBookingInfoForUserByBookId(bookId, currentUserId);
    }

    @Override
    public BookingInfoDto buildBookingInfo(long bookId, Booking booking, long currentUserId) {

        BookingInfo bookingInfo = checkAndBuildBookingInfo(booking, currentUserId);

        return bookingInfoMapper.toBookingInfoDtoFromBooking(bookingInfo);
    }

    @Override
    public void fillBookWithBookingInfo(WithBookingInfoBookDto book) {

        if (book.getStatus().getName().equals(BookStatusConstant.IN_USE)) {

            BookingInfo bookingInfo = getBookingInfoForUserByBookId(book.getId(), book.getOwner().getId());
            book.setBookingInfoDto(bookingInfoMapper.toBookingInfoDtoFromBooking(bookingInfo));

        }
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

    @Override
    public BookingDto tryGetBookingDto(BookingForTargetReaderDto bookingForUserDto, long bookId) {

        if (Objects.isNull(bookingForUserDto)) {

            throw new WrongDtoDataException("BookingForTargetReaderDto cannot be null when trying to get BookingDto from it.");

        }

        return bookingMapper.bookingForTargetReaderDtoToBookingDto(bookingForUserDto, bookId);
    }

    private void fillBookingFields(Booking booking, Book book, long readerId) {
        checkAndSetDates(booking);
        trySetReader(booking, readerId);
        checkLimitOfActiveBookings(booking.getReader().getId());
        setBookAndChangeItsStatus(booking, book);
        booking.setActive(true);
    }

    private void tryToReturnBooking(ReviewDto reviewDto, long id, Booking booking) {

        if (booking.isActive()) {

            booking.getBook().setStatus(BookStatusConstant.AVAILABLE_BOOK_STATUS);
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

    private BookingInfo getBookingInfoForUserByBookId(long bookId, long currentUserId) {

        log.info("Try to find active booking by book id = {}", bookId);

        Optional<Booking> bookingOptional = getActiveByBookId(bookId);

        return checkAndBuildBookingInfoFromOptional(bookId, bookingOptional, currentUserId);
    }

    private Optional<Booking> getActiveByBookId(long bookId) {

        return bookingRepository.findByBookIdAndActiveIsTrue(bookId);

    }

    private BookingInfo checkAndBuildBookingInfoFromOptional(long bookId, Optional<Booking> bookingOptional, long currentUserId) {

        Booking booking = bookingOptional
                .orElseThrow(
                        () -> new NotActiveBookingException("Booking with the specified activity has not found for book id " + bookId)
                );

        return checkAndBuildBookingInfo(booking, currentUserId);
    }

    private BookingInfo checkAndBuildBookingInfo(Booking booking, long currentUserId) {
        BookingInfo bookingInfo = new BookingInfo();

        setFullNameReaderToBookingInfo(bookingInfo, booking);
        checkAndSetCurrentUserIsReader(bookingInfo, booking.getReader().getId(), currentUserId);
        tryToSetCommentToBookingInfo(booking.getStatus().getName(), booking.getBook().getId(), bookingInfo);
        bookingInfo.setStatus(booking.getStatus());
        bookingInfo.setBookingEndDate(booking.getFinishDate());

        return bookingInfo;
    }

    private void checkAndSetCurrentUserIsReader(BookingInfo bookingInfo, long bookingReaderId, long currentUserId) {

        if (currentUserId == bookingReaderId) {

            bookingInfo.setCurrentUserReader(true);
        }
    }

    private void tryToSetCommentToBookingInfo(String bookingStatusName, long bookId, BookingInfo bookingInfo) {

        if (bookingStatusName.equals(BookingStatusConstant.DECLINED)) {

            BookingAcceptance bookingAcceptance = bookingAcceptanceRepository.findByBook_Id(bookId)
                    .orElseThrow(() -> new NotFoundException(
                            String.format("Can't find decline comment for booking with book id %d.", bookId))
                    );

            bookingInfo.setComment(bookingAcceptance.getComment());
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
        bookings = filterActiveBookingsForLimitByStatus(bookings);

        if (bookings.size() >= BookingConstant.ACTIVE_BOOKINGS_LIMIT) {

            log.info("Number of active bookings is exceeded");

            throw new BookingBookLimitException("You can have maximum count active bookings.");

        }
    }

    private List<Booking> filterActiveBookingsForLimitByStatus(List<Booking> bookings) {
        return bookings
                .stream()
                .filter(booking -> !booking.getStatus().getName().equals(BookingStatusConstant.AWAITING_CONFIRMATION)
                        && !booking.getStatus().getName().equals(BookingStatusConstant.DECLINED))
                .collect(Collectors.toList());
    }

    private void recountingBookRate(Booking booking) {

        List<Short> rateList = bookingRepository.getRatesByBookId(booking.getBook().getId());
        int sumOfRate = rateList.stream().mapToInt(a -> a).sum();
        int countOfRates = rateList.size();
        double bookRate = (double) sumOfRate / countOfRates;
        double bookRateRounded = Precision.round(bookRate, 1);
        booking.getBook().setRate(bookRateRounded);

    }

    private Booking updateBooking(Booking booking, Book book, long readerId) {

        if (booking.getId() > 0) {

            fillBookingFields(booking, book, readerId);

            return bookingRepository.save(booking);

        } else {

            throw new WrongDtoDataException("Wrong BookingDto id," +
                    " when updating booking, id should be greater than 0.");

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

    private void trySetReader(Booking booking, long readerId) {

        log.info("Try to find current user and set to booking");

        if (Objects.isNull(booking.getReader()) || booking.getReader().getId() != readerId) {

            User user = new User();
            user.setId(readerId);
            booking.setReader(user);

        }
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

    private void setBookAndChangeItsStatus(Booking booking, Book book) {

        String bookStatusName = book.getStatus().getName();
        String bookingStatusName = booking.getStatus().getName();

        if (bookStatusName.equals(BookStatusConstant.AVAILABLE) && bookingStatusName.equals(BookingStatusConstant.NOT_REQUIRE_CONFIRMATION)) {

            book.setStatus(BookStatusConstant.IN_USE_BOOK_STATUS);
            booking.setBook(book);

        } else if (bookStatusName.equals(BookStatusConstant.IN_USE) && bookingStatusName.equals((BookingStatusConstant.AWAITING_CONFIRMATION))) {

            booking.setBook(book);

        } else if (bookStatusName.equals(BookStatusConstant.IN_USE) && bookingStatusName.equals(BookingStatusConstant.ACCEPTED)) {

            booking.setBook(book);

        } else if (bookStatusName.equals(BookStatusConstant.IN_USE) && bookingStatusName.equals(BookingStatusConstant.DECLINED)) {

            booking.setBook(book);

        } else {

            throw new BookingBookException(
                    String.format("Incorrect combination of statuses for create or update booking: book status is %s, booking status is %s",
                            bookingStatusName, bookingStatusName)
            );

        }
    }

    private Booking getSavedAndRefreshed(Booking booking) {
        booking = bookingRepository.save(booking);
        entityManager.refresh(booking);
        return booking;
    }
}