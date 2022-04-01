package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.StatusConstant;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.entity.*;
import by.library.itechlibrary.exeption_handler.exception.BookingBookException;
import by.library.itechlibrary.exeption_handler.exception.NotActiveBookingException;
import by.library.itechlibrary.exeption_handler.exception.WrongDateException;
import by.library.itechlibrary.mapper.BookingMapper;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.repository.BookingRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class BookingServiceImplTest {

    @Mock
    BookingRepository bookingRepository;

    @Mock
    BookingMapper bookingMapper;

    @Mock
    SecurityUserDetailsServiceImpl securityUserDetailsService;

    @Mock
    BookRepository bookRepository;

    @InjectMocks
    BookingServiceImpl bookingService;


    @Test
    void findAllByReaderId() {

        long userId = 1;
        Booking booking = getBooking();
        List<Booking> bookings = List.of(booking);
        BookingResponseDto bookingResponseDto = getBookingResponseDto();
        List<BookingResponseDto> bookingResponseDtos = List.of(bookingResponseDto);

        Mockito.doReturn(bookings).when(bookingRepository).findAllByReaderId(userId);
        Mockito.doReturn(bookingResponseDtos).when(bookingMapper).mapBookingResponseDtoList(bookings);

        Assertions.assertEquals(bookingResponseDtos, bookingService.findAllByReaderId(userId));

        Mockito.verify(bookingRepository, Mockito.times(1)).findAllByReaderId(userId);
        Mockito.verify(bookingMapper, Mockito.times(1)).mapBookingResponseDtoList(bookings);

    }

    @Nested
    class saveTest {
        @Test
        void saveBooking() {

            BookingDto bookingDto = getBookingDto();
            bookingDto.setId(0);
            Booking booking = getBooking();
            BookingResponseDto bookingResponseDto = getBookingResponseDto();

            Mockito.doReturn(Optional.of(booking.getBook())).when(bookRepository).findById(booking.getBook().getId());
            Mockito.doReturn(booking).when(bookingMapper).toBookingFromBookingDto(bookingDto);
            Mockito.doReturn(bookingResponseDto).when(bookingMapper).toNewBookingResponseDto(booking);
            Mockito.doReturn(booking).when(bookingRepository).save(booking);

            Assertions.assertEquals(bookingResponseDto, bookingService.save(bookingDto));

            Mockito.verify(bookRepository, Mockito.times(1)).findById(booking.getBook().getId());
            Mockito.verify(bookingMapper, Mockito.times(1)).toBookingFromBookingDto(bookingDto);
            Mockito.verify(bookingMapper, Mockito.times(1)).toNewBookingResponseDto(booking);
            Mockito.verify(bookingRepository, Mockito.times(1)).save(booking);
            Mockito.verify(securityUserDetailsService, Mockito.times(1)).getCurrentUserId();

        }

        @DisplayName("Save-throw-WrongDateException-finish-date-more-then-one-month")
        @Test
        void saveBookingWithWrongDateExceptionFinishDate() {

            BookingDto bookingDto = getBookingDto();
            bookingDto.setId(0);
            Booking booking = getBooking();
            booking.setFinishDate(LocalDate.now().plusMonths(2));
            String exceptionMessage = "Finish the date must not exceed a month from the start date. " +
                    "And current date and start date should be before finish date.";

            Mockito.doReturn(booking).when(bookingMapper).toBookingFromBookingDto(bookingDto);

            WrongDateException exception = Assertions.assertThrowsExactly(WrongDateException.class,
                    () -> bookingService.save(bookingDto));
            Assertions.assertEquals(exceptionMessage, exception.getMessage());

            Mockito.verify(bookingMapper, Mockito.times(1)).toBookingFromBookingDto(bookingDto);
            Mockito.verify(bookRepository, Mockito.times(0)).findById(booking.getBook().getId());
            Mockito.verify(bookingMapper, Mockito.times(0)).toNewBookingResponseDto(booking);
            Mockito.verify(bookingRepository, Mockito.times(0)).save(booking);

        }


        @DisplayName("Save-throw-WrongDateException-current-date-after-finish-date")
        @Test
        void saveBookingWithWrongDateExceptionCurrentDate() {

            BookingDto bookingDto = getBookingDto();
            bookingDto.setId(0);
            Booking booking = getBooking();
            booking.setFinishDate(booking.getFinishDate().minusMonths(1));
            booking.setStartDate(booking.getStartDate().minusMonths(1));
            String exceptionMessage = "Finish the date must not exceed a month from the start date. " +
                    "And current date and start date should be before finish date.";

            Mockito.doReturn(booking).when(bookingMapper).toBookingFromBookingDto(bookingDto);

            WrongDateException exception = Assertions.assertThrowsExactly(WrongDateException.class,
                    () -> bookingService.save(bookingDto));
            Assertions.assertEquals(exceptionMessage, exception.getMessage());

            Mockito.verify(bookingMapper, Mockito.times(1)).toBookingFromBookingDto(bookingDto);
            Mockito.verify(bookRepository, Mockito.times(0)).findById(booking.getBook().getId());
            Mockito.verify(bookingMapper, Mockito.times(0)).toNewBookingResponseDto(booking);
            Mockito.verify(bookingRepository, Mockito.times(0)).save(booking);

        }

        @DisplayName("Save-throw-BookingBookException-inUse-status")
        @Test
        void saveBookingWithBookingBookExceptionInUseStatus() {

            BookingDto bookingDto = getBookingDto();
            bookingDto.setId(0);
            Booking booking = getBooking();
            booking.getBook().setStatus(StatusConstant.IN_USE_BOOK_STATUS);
            String exceptionMessage = "Book is not available or in use now";

            Mockito.doReturn(booking).when(bookingMapper).toBookingFromBookingDto(bookingDto);
            Mockito.doReturn(Optional.of(booking.getBook())).when(bookRepository).findById(booking.getBook().getId());

            BookingBookException exception = Assertions.assertThrowsExactly(BookingBookException.class,
                    () -> bookingService.save(bookingDto));
            Assertions.assertEquals(exceptionMessage, exception.getMessage());

            Mockito.verify(bookingMapper, Mockito.times(1)).toBookingFromBookingDto(bookingDto);
            Mockito.verify(bookRepository, Mockito.times(1)).findById(booking.getBook().getId());
            Mockito.verify(bookingMapper, Mockito.times(0)).toNewBookingResponseDto(booking);
            Mockito.verify(bookingRepository, Mockito.times(0)).save(booking);

        }

        @DisplayName("Save-throw-BookingBookException-inUse-and-notAvailable-statuses")
        @Test
        void saveBookingWithBookingBookExceptionNotAvailableStatus() {

            BookingDto bookingDto = getBookingDto();
            bookingDto.setId(0);
            Booking booking = getBooking();
            booking.getBook().setStatus(StatusConstant.NOT_AVAILABLE_BOOK_STATUS);
            String exceptionMessage = "Book is not available or in use now";

            Mockito.doReturn(booking).when(bookingMapper).toBookingFromBookingDto(bookingDto);
            Mockito.doReturn(Optional.of(booking.getBook())).when(bookRepository).findById(booking.getBook().getId());

            BookingBookException exception = Assertions.assertThrowsExactly(BookingBookException.class,
                    () -> bookingService.save(bookingDto));
            Assertions.assertEquals(exceptionMessage, exception.getMessage());

            Mockito.verify(bookingMapper, Mockito.times(1)).toBookingFromBookingDto(bookingDto);
            Mockito.verify(bookRepository, Mockito.times(1)).findById(booking.getBook().getId());
            Mockito.verify(bookingMapper, Mockito.times(0)).toNewBookingResponseDto(booking);
            Mockito.verify(bookingRepository, Mockito.times(0)).save(booking);


        }
    }

    @Test
    void findAllByBookId() {

        long bookId = 1;
        Booking booking = getBooking();
        List<Booking> bookings = List.of(booking);
        BookingResponseDto bookingResponseDto = getBookingResponseDto();
        List<BookingResponseDto> bookingResponseDtos = List.of(bookingResponseDto);

        Mockito.doReturn(bookings).when(bookingRepository).findAllByBookId(bookId);
        Mockito.doReturn(bookingResponseDtos).when(bookingMapper).mapBookingResponseDtoList(bookings);

        Assertions.assertEquals(bookingResponseDtos, bookingService.findAllByBookId(bookId));

        Mockito.verify(bookingRepository, Mockito.times(1)).findAllByBookId(bookId);
        Mockito.verify(bookingMapper, Mockito.times(1)).mapBookingResponseDtoList(bookings);

    }

    @Test
    void findCurrentByBookId() {

        long bookId = 1;
        BookingResponseDto bookingResponseDto = getBookingResponseDto();
        Booking booking = getBooking();

        Mockito.doReturn(Optional.of(booking)).when(bookingRepository).findByBookIdAndActiveIsTrue(bookId);
        Mockito.doReturn(bookingResponseDto).when(bookingMapper).toNewBookingResponseDto(booking);

        Assertions.assertEquals(bookingResponseDto, bookingService.findCurrentByBookId(bookId));

        Mockito.verify(bookingRepository, Mockito.times(1)).findByBookIdAndActiveIsTrue(bookId);
        Mockito.verify(bookingMapper, Mockito.times(1)).toNewBookingResponseDto(booking);

    }

    @Test
    void findAllCurrentsByReaderId() {

        long userId = 1;
        BookingResponseDto bookingResponseDto = getBookingResponseDto();
        Booking booking = getBooking();
        List<Booking> bookings = List.of(booking);
        List<BookingResponseDto> bookingResponseDtos = List.of(bookingResponseDto);

        Mockito.doReturn(bookings).when(bookingRepository).findAllByReaderIdAndCurrentDate(LocalDate.now(), userId);
        Mockito.doReturn(bookingResponseDtos).when(bookingMapper).mapBookingResponseDtoList(bookings);

        Assertions.assertEquals(bookingResponseDtos, bookingService.findAllCurrentsByReaderId(userId));

        Mockito.verify(bookingRepository, Mockito.times(1)).findAllByReaderIdAndCurrentDate(LocalDate.now(), userId);
        Mockito.verify(bookingMapper, Mockito.times(1)).mapBookingResponseDtoList(bookings);

    }

    @Test
    void findById() {

        long bookingId = 1;
        BookingResponseDto bookingResponseDto = getBookingResponseDto();
        Booking booking = getBooking();

        Mockito.doReturn(Optional.of(booking)).when(bookingRepository).findById(bookingId);
        Mockito.doReturn(bookingResponseDto).when(bookingMapper).toNewBookingResponseDto(booking);

        Assertions.assertEquals(bookingResponseDto, bookingService.findById(bookingId));

        Mockito.verify(bookingRepository, Mockito.times(1)).findById(bookingId);
        Mockito.verify(bookingMapper, Mockito.times(1)).toNewBookingResponseDto(booking);

    }

    @Test
    void updateFinishDate() {

        long bookingId = 1;
        Booking booking = getBooking();
        BookingResponseDto bookingResponseDto = getBookingResponseDto();

        Mockito.doReturn(Optional.of(booking)).when(bookingRepository).findById(bookingId);
        Mockito.doReturn(booking).when(bookingRepository).save(booking);
        Mockito.doReturn(bookingResponseDto).when(bookingMapper).toNewBookingResponseDto(booking);

        bookingService.updateFinishDate(booking.getId(), LocalDate.now().plusDays(5));

        Mockito.verify(bookingRepository, Mockito.times(1)).findById(bookingId);
        Mockito.verify(bookingRepository, Mockito.times(1)).save(booking);
        Mockito.verify(bookingMapper, Mockito.times(1)).toNewBookingResponseDto(booking);

    }

    @Nested
    class returnTest {

        @Test
        void returnBooking() {

            long bookingId = 1;
            Booking booking = getBooking();
            ReviewDto reviewDto = new ReviewDto((short) 2, "test feedback");


            Mockito.doReturn(Optional.of(booking)).when(bookingRepository).findById(bookingId);
            Mockito.doReturn(booking).when(bookingRepository).save(booking);

            bookingService.returnBooking(reviewDto, bookingId);

            Mockito.verify(bookingRepository, Mockito.times(1)).findById(bookingId);
            Mockito.verify(bookingRepository, Mockito.times(1)).save(booking);

        }

        @Test
        void returnWithNotActiveBookingException() {

            long bookingId = 1;
            Booking booking = getBooking();
            booking.setActive(false);
            ReviewDto reviewDto = new ReviewDto((short) 2, "test feedback");
            String exceptionMessage = "Booking with id = " + bookingId + " is not active now.";

            Mockito.doReturn(Optional.of(booking)).when(bookingRepository).findById(bookingId);

            NotActiveBookingException exception = Assertions.assertThrowsExactly(NotActiveBookingException.class,
                    () -> bookingService.returnBooking(reviewDto, bookingId));
            Assertions.assertEquals(exceptionMessage, exception.getMessage());

            Mockito.verify(bookingRepository, Mockito.times(1)).findById(bookingId);
            Mockito.verify(bookingRepository, Mockito.times(0)).save(booking);

        }
    }

    @Nested
    class checkUserIsReaderTest {

        long userId = 1;
        long bookId = 1;
        Booking booking = getBooking();

        @Test
        void isReaderTrue() {

            Mockito.doReturn(Optional.of(booking)).when(bookingRepository)
                    .findByActiveIsTrueAndReaderIdAndBookId(userId, bookId);

            Assertions.assertTrue(bookingService.getBookingInfo(bookId));

            Mockito.verify(bookingRepository, Mockito.times(1))
                    .findByActiveIsTrueAndReaderIdAndBookId(userId, bookId);

        }

        @Test
        void isReaderFalse() {

            Mockito.doReturn(Optional.empty()).when(bookingRepository)
                    .findByActiveIsTrueAndReaderIdAndBookId(userId, bookId);

            Assertions.assertFalse(bookingService.getBookingInfo(bookId));

            Mockito.verify(bookingRepository, Mockito.times(1))
                    .findByActiveIsTrueAndReaderIdAndBookId(userId, bookId);

        }
    }

    @Test
    void disableCurrentBooking() {

        long bookId = 1;
        Booking booking = getBooking();

        Mockito.doReturn(Optional.of(booking)).when(bookingRepository)
                .findByBookIdAndActiveIsTrue(bookId);

        bookingService.disableCurrentBooking(bookId);

        Mockito.verify(bookingRepository, Mockito.times(1))
                .findByBookIdAndActiveIsTrue(bookId);

    }

    private BookingResponseDto getBookingResponseDto() {

        BookingResponseDto bookingResponseDto = new BookingResponseDto();
        bookingResponseDto.setActive(true);
        bookingResponseDto.setId(1);
        bookingResponseDto.setFinishDate(LocalDate.of(2022, 01, 25));
        bookingResponseDto.setStartDate(LocalDate.of(2022, 01, 01));

        return bookingResponseDto;
    }

    private BookingDto getBookingDto() {

        BookingDto bookingDto = new BookingDto();
        bookingDto.setActive(true);
        bookingDto.setId(1);
        bookingDto.setFinishDate(LocalDate.now());
        bookingDto.setStartDate(LocalDate.now());

        return bookingDto;
    }

    private Booking getBooking() {

        Booking booking = new Booking();
        booking.setActive(true);
        booking.setRate((short) 1);
        booking.setFinishDate(LocalDate.now());
        booking.setStartDate(LocalDate.now());
        booking.setBook(getTestBook());
        booking.setId(1);

        return booking;
    }

    private User getTestUser() {

        ConfirmationData confirmationData = new ConfirmationData();
        confirmationData.setId(1);
        confirmationData.setActivated(true);
        confirmationData.setRequestDate(LocalDate.of(2022, 01, 23));

        User user = new User();
        user.setId(1);
        user.setFileInfo(null);
        user.setGoogleEmail("test@gmail.com");
        user.setActive(true);
        user.setCorpEmail("testITechArt@test.com");
        user.setName("IVAN");
        user.setSurname("IVANOV");
        user.setConfirmationData(confirmationData);

        return user;
    }

    private Book getTestBook() {

        Language language = new Language((short) 1, "ENGLISH");
        Category category = new Category((short) 1, "PROFESSIONAL");

        Book book = new Book();
        book.setOwner(getTestUser());
        book.setFileInfo(null);
        book.setRate(2);
        book.setCreateDate(LocalDate.of(2022, 02, 27));
        book.setAuthor("Ivan Ivanov");
        book.setDescription("test description");
        book.setId(1);
        book.setLink("http//:test:8089:link)");
        book.setTitle("about test");
        book.setBookings(List.of());
        book.setLanguage(language);
        book.setCategory(category);
        book.setStatus(StatusConstant.AVAILABLE_BOOK_STATUS);

        return book;
    }
}