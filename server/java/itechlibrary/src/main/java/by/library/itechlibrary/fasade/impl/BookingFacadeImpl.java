package by.library.itechlibrary.fasade.impl;

import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.fasade.BookingFacade;
import by.library.itechlibrary.service.BookingService;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class BookingFacadeImpl implements BookingFacade {

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final BookingService bookingService;

    @Override
    public BookingInfo getBookingInfo(long bookId) {

        Long currentUserId = securityUserDetailsService.getCurrentUserId();

        return bookingService.getBookingInfo(bookId, currentUserId);
    }

    @Override
    public BookingResponseDto save(BookingDto bookingDto) {

        Long currentUserId = securityUserDetailsService.getCurrentUserId();

        return bookingService.save(bookingDto, currentUserId);
    }
}
