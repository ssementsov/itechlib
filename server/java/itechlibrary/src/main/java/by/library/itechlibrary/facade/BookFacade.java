package by.library.itechlibrary.facade;

import by.library.itechlibrary.dto.book.*;
import by.library.itechlibrary.dto.booking.BookingForTargetReaderDto;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookFacade {

    WithBookingStatusBookDto save(WithOwnerBookDto withOwnerBookDto, BookingForTargetReaderDto bookingForTargetReaderDto, MultipartFile multipartFile);

    void removedAttachedFile(long fileId);

    void attachFile(MultipartFile multipartFile, long bookId);

    List<WithOwnerBookDto> getOwnersBook(SortingCriteria parameterInfoDto);

    List<ResponseOwnBookDto> getCurrentUsersBookedBooks();

    FullBookDto update(WithLikAndStatusBookDto bookDto);

    FullBookDto getByIdFullVersion(long id);

    List<WithOwnerBookDto> getAll(SortingCriteria sortingCriteria);

    void remove(long id);

}