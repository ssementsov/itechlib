package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.book.BookDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {

    List<BookDto> findAll();

    BookDto saveBook(BookDto bookDto);

    FullBookDto findByIdFullVersion(long id);

    List<BookDto> findOwnersBook();

    BookDto updateStatus(String status, long bookId);

    void remove(long id);

    void attachFile(MultipartFile multipartFile, long bookId);

    void removedAttachFile(long fileId);

}
