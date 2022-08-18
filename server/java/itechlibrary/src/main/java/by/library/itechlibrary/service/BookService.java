package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.ResponseOwnBookDto;
import by.library.itechlibrary.dto.book.WithLikAndStatusBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.FileInfo;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.pojo.BookUpdatedInfo;

import java.util.List;
import java.util.Optional;

public interface BookService {

    List<WithOwnerBookDto> getAll(SortingCriteria sortingCriteria);

    BookUpdatedInfo update(WithLikAndStatusBookDto bookDto, long currentUserId);

    WithOwnerBookDto save(WithOwnerBookDto withOwnerBookDto, Optional<FileInfo> fileInfo, User currentUser);

    Book getById(long id);

    FullBookDto getByIdFullVersion(long id);

    List<WithOwnerBookDto> getOwnersBook(SortingCriteria parameterInfoDto, long ownerId);

    List<ResponseOwnBookDto> getCurrentUsersBookedBooks(long currentUserId);

    void remove(long id);

    void attachFile(Optional<FileInfo> fileInfo, long bookId, long currentUserId);

    void removedAttachedFile(long fileId, long currentUserId);

}
