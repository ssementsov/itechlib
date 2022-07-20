package by.library.itechlibrary.facade;

import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.ResponseOwnBookDto;
import by.library.itechlibrary.dto.book.WithLikAndStatusBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookFacade {

    WithOwnerBookDto save(WithOwnerBookDto withOwnerBookDto, MultipartFile multipartFile);

    void removedAttachedFile(long fileId);

    void attachFile(MultipartFile multipartFile, long bookId);

    List<WithOwnerBookDto> getOwnersBook(SortingCriteria parameterInfoDto);

    List<ResponseOwnBookDto> getCurrentUsersBookedBooks();

    FullBookDto update(WithLikAndStatusBookDto bookDto);

    FullBookDto getByIdFullVersion(long id);

    List<WithOwnerBookDto> getAll(SortingCriteria sortingCriteria);

    void remove(long id);

}
