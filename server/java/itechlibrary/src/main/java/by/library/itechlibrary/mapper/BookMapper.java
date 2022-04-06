package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.book.ResponseOwnBookDto;
import by.library.itechlibrary.dto.book.WithLikAndStatusBookDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.entity.Book;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMapper {

    @Named(value = "book")
    WithOwnerBookDto toWithOwnerBookDto(Book book);

    @Named(value = "WithOwnerBookDto")
    Book toBook(WithOwnerBookDto withOwnerBookDto);

    @IterableMapping(qualifiedByName = "book")
    List<WithOwnerBookDto> mapWithOwnerBookDtoList(List<Book> books);

    @IterableMapping(qualifiedByName = "WithOwnerBookDto")
    List<Book> mapBookList(List<WithOwnerBookDto> withOwnerBookDtos);

    @Named(value = "fullBookDto")
    FullBookDto toFullBookDto(Book book);

    @Named(value = "mapWithLikAndStatusBookDtoToBook")
    Book toBook(WithLikAndStatusBookDto book);

    @Named(value = "ResponseOwnBookDto")
    ResponseOwnBookDto mapToResponseOwnBookDto(Book book);

    @IterableMapping(qualifiedByName = "ResponseOwnBookDto")
    List<ResponseOwnBookDto> mapToResponseOwnBookDtoList(List<Book> books);

}