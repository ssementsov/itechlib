package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.BookDto;
import by.library.itechlibrary.entity.Book;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import java.util.*;

@Mapper(componentModel = "spring")
public interface BookMapper {

    @Named(value = "book")
    BookDto toBookDto(Book book);

    @Named(value = "bookDto")
    Book toBook(BookDto bookDto);

    @IterableMapping(qualifiedByName = "book")
    List<BookDto> mapBookDtoList (List<Book> books);

    @IterableMapping(qualifiedByName = "bookDto")
    List<Book> mapBookList (List<BookDto> bookDtos);

}