package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.ResponseOwnBookDto;
import by.library.itechlibrary.dto.book.WithLikAndStatusBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {

    List<WithOwnerBookDto> getAll(int pageNumber, int pageCapacity);

    FullBookDto update(WithLikAndStatusBookDto bookDto);

    WithOwnerBookDto save(WithOwnerBookDto withOwnerBookDto, MultipartFile multipartFile);

    FullBookDto getByIdFullVersion(long id);

    List<WithOwnerBookDto> getOwnersBook(int pageNumber, int pageCapacity);

    List<ResponseOwnBookDto> getCurrentUsersBookedBooks();

    void remove(long id);

    void attachFile(MultipartFile multipartFile, long bookId);

    void removedAttachedFile(long fileId);

}
