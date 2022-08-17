package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.BookingAcceptanceResponseDto;
import by.library.itechlibrary.entity.Book;

public interface BookingAcceptanceService {

    BookingAcceptanceResponseDto save(BookingAcceptanceDto bookingAcceptanceDto, Book book);
}