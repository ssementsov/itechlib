package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.BookingConstant;
import by.library.itechlibrary.dto.BookingDto;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongDateException;
import by.library.itechlibrary.exeption_handler.exception.WrongDtoDataException;
import by.library.itechlibrary.mapper.BookingMapper;
import by.library.itechlibrary.repository.BookingRepository;
import by.library.itechlibrary.service.BookingService;
import by.library.itechlibrary.service.MailNotificationService;
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


    @Override
    public List<BookingDto> findAllByReaderId(long id) {

        log.info("Try to find bookings by reader id = {}.", id);

        List<Booking> bookings = bookingRepository.findAllByReaderId(id);

        return bookingMapper.mapBookingDtoList(bookings);
    }

    @Override
    public BookingDto saveBooking(BookingDto bookingDto) {

        if (bookingDto.getId() == 0) {

            log.info("Try to map bookingDto and save booking.");

            Booking booking = bookingMapper.toBooking(bookingDto);
            checkAndSetDates(booking);
            booking = bookingRepository.save(booking);

            return bookingMapper.toBookingDto(booking);

        } else {

            throw new WrongDtoDataException("Wrong BookingDto id," +
                    " when saving new booking, id should be equals 0.");

        }
    }

    @Override
    public List<BookingDto> findAllByBookId(long id) {

        log.info("Try to find bookings by book id = {}.", id);

        List<Booking> bookings = bookingRepository.findAllByBookId(id);

        return bookingMapper.mapBookingDtoList(bookings);
    }

    @Override
    public List<BookingDto> findAllCurrentsByReaderId(long id) {

        log.info("Try to find current bookings by reader id = {}.", id);

        List<Booking> bookings = bookingRepository
                .findAllByReaderIdAndCurrentDate(LocalDate.now(), id);

        return bookingMapper.mapBookingDtoList(bookings);
    }

    @Override
    public BookingDto findById(long id) {

        log.info("Try to find booking by id = {}.", id);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("The booking was not find."));

        return bookingMapper.toBookingDto(booking);
    }

    @Transactional
    @Override
    public BookingDto updateFinishDate(long bookingId, LocalDate newFinishDate) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("The booking was not find by id = " + bookingId));

        checkFinishDate(booking.getStartDate(), newFinishDate);
        booking.setFinishDate(newFinishDate);
        booking = bookingRepository.save(booking);

        return bookingMapper.toBookingDto(booking);
    }

    private void checkAndSetDates(Booking booking) {

        checkAndSetStartDate(booking);
        checkFinishDate(booking.getStartDate(), booking.getFinishDate());

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
}
