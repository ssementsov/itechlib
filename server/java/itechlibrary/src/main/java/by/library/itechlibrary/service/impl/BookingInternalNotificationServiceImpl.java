package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.internal_notification.BookingInternalNotificationId;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.repository.BookingInternalNotificationRepository;
import by.library.itechlibrary.service.BookingInternalNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookingInternalNotificationServiceImpl implements BookingInternalNotificationService {

    private final BookingInternalNotificationRepository repository;

    @Override
    public long getNotificationId(BookingInternalNotificationId bookingInternalNotificationId) {

        return repository.getNotificationIdById(bookingInternalNotificationId)
                .orElseThrow(() -> new NotFoundException("Can't find id of internal notification by booking internal notification id: "
                                + bookingInternalNotificationId.toString()));
    }

}