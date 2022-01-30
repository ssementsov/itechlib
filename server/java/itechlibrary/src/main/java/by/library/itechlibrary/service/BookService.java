package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.book.BookDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {

    List<WithOwnerBookDto> findAll();

    FullBookDto update(BookDto bookDto);

    WithOwnerBookDto save(WithOwnerBookDto withOwnerBookDto);

    FullBookDto findByIdFullVersion(long id);

    List<WithOwnerBookDto> findOwnersBook();

    void remove(long id);

    void attachFile(MultipartFile multipartFile, long bookId);

    void removedAttachedFile(long fileId);

}
