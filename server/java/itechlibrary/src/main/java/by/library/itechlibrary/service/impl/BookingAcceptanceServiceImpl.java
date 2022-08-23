package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.BookingAcceptanceResponseDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.BookingAcceptance;
import by.library.itechlibrary.mapper.BookingAcceptanceMapper;
import by.library.itechlibrary.repository.BookingAcceptanceRepository;
import by.library.itechlibrary.service.BookingAcceptanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookingAcceptanceServiceImpl implements BookingAcceptanceService {

    private final BookingAcceptanceMapper acceptanceMapper;

    private final BookingAcceptanceRepository acceptanceRepository;


    @Override
    public BookingAcceptanceResponseDto save(BookingAcceptanceDto acceptanceDto, Book book) {

        BookingAcceptance bookingAcceptance = acceptanceMapper.toBookingAcceptanceFromBookingAcceptanceDto(acceptanceDto);
        BookingAcceptance savedBookingAcceptance = acceptanceRepository.save(bookingAcceptance);

        return acceptanceMapper.toBookingAcceptanceResponseDtoFromBookingAcceptance(savedBookingAcceptance);
    }

}