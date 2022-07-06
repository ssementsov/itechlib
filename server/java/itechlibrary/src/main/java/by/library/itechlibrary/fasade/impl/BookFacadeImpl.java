package by.library.itechlibrary.fasade.impl;

import by.library.itechlibrary.constant.StatusConstant;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.ResponseOwnBookDto;
import by.library.itechlibrary.dto.book.WithLikAndStatusBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.entity.FileInfo;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.fasade.BookFacade;
import by.library.itechlibrary.mapper.BookingInfoMapper;
import by.library.itechlibrary.pojo.BookUpdatedInfo;
import by.library.itechlibrary.service.BookService;
import by.library.itechlibrary.service.BookingService;
import by.library.itechlibrary.service.FileInfoService;
import by.library.itechlibrary.service.UserService;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class BookFacadeImpl implements BookFacade {

    private final UserService userService;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final BookService bookService;

    private final BookingService bookingService;

    private final FileInfoService fileInfoService;

    private final BookingInfoMapper bookingInfoMapper;

    @Transactional
    @Override
    public WithOwnerBookDto save(WithOwnerBookDto withOwnerBookDto, MultipartFile multipartFile) {

        Optional<FileInfo> fileInfo = getFileInfo(multipartFile);
        long currentUserId = securityUserDetailsService.getCurrentUserId();
        User currentUser = userService.getUserById(currentUserId);

        return bookService.save(withOwnerBookDto, fileInfo, currentUser);
    }

    @Transactional
    @Override
    public void removedAttachedFile(long fileId) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        bookService.removedAttachedFile(fileId, currentUserId);
        fileInfoService.removeById(fileId);

    }

    @Override
    public void attachFile(MultipartFile multipartFile, long bookId) {

        Optional<FileInfo> fileInfo = getFileInfo(multipartFile);
        long currentUserId = securityUserDetailsService.getCurrentUserId();
        bookService.attachFile(fileInfo, bookId, currentUserId);

    }

    @Override
    public List<WithOwnerBookDto> getOwnersBook(SortingCriteria parameterInfoDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();

        return bookService.getOwnersBook(parameterInfoDto, currentUserId);
    }

    @Override
    public List<ResponseOwnBookDto> getCurrentUsersBookedBooks() {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        List<ResponseOwnBookDto> responseOwnBookDtoList = bookService.getCurrentUsersBookedBooks(currentUserId);
        responseOwnBookDtoList.forEach(x -> x.setBaseBookingInfo(bookingInfoMapper
                .mapToBaseBookingInfoDto(bookingService.getBaseBookingInfo(x.getId()))));

        return responseOwnBookDtoList;
    }

    @Transactional
    @Override
    public FullBookDto update(WithLikAndStatusBookDto bookDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        BookUpdatedInfo bookUpdatedInfo = bookService.update(bookDto, currentUserId);

        if (bookUpdatedInfo.isDisableBooking()) {

            bookingService.disableCurrentBooking(bookDto.getId());

        }

        return bookUpdatedInfo.getFullBookDto();
    }

    @Override
    public FullBookDto getByIdFullVersion(long id) {

        FullBookDto fullBookDto = bookService.getByIdFullVersion(id);

        if (fullBookDto.getStatus().getName().equals(StatusConstant.IN_USE)) {

            BookingInfo bookingInfo = bookingService.getBookingInfo(id);
            fullBookDto.setBookingInfoDto(bookingInfoMapper.toBookingInfoDtoFromBooking(bookingInfo));

        }

        return fullBookDto;
    }

    @Override
    public List<WithOwnerBookDto> getAll(SortingCriteria sortingCriteria) {

        return bookService.getAll(sortingCriteria);
    }

    @Override
    public void remove(long id) {

        bookService.remove(id);

    }

    private Optional<FileInfo> getFileInfo(MultipartFile multipartFile) {

        if (multipartFile != null) {

            return Optional.of(fileInfoService.getFileInfo(multipartFile));

        }

        return Optional.empty();
    }
}
