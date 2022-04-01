package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.StatusConstant;
import by.library.itechlibrary.dto.BookStatusDto;
import by.library.itechlibrary.dto.CategoryDto;
import by.library.itechlibrary.dto.LanguageDto;
import by.library.itechlibrary.dto.UserDto;
import by.library.itechlibrary.dto.book.BookDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.entity.*;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongBookStatusException;
import by.library.itechlibrary.exeption_handler.exception.WrongCurrentUserException;
import by.library.itechlibrary.mapper.BookMapper;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.service.BookingService;
import by.library.itechlibrary.service.FileInfoService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class BookServiceImplTest {

    @Mock
    BookRepository bookRepository;

    @Mock
    BookMapper bookMapper;

    @Mock
    SecurityUserDetailsServiceImpl securityUserDetailsService;

    @Mock
    BookingService bookingService;

    @Mock
    FileInfoService fileInfoService;

    @InjectMocks
    BookServiceImpl bookService;

    @Test
    void findAll() {

        List<Book> books = getTestBookList();
        List<WithOwnerBookDto> withOwnerBookDtoListTemplate = getTestWithOwnerBookDtoList();

        Mockito.doReturn(books).when(bookRepository).findAll();
        Mockito.doReturn(withOwnerBookDtoListTemplate).when(bookMapper).mapWithOwnerBookDtoList(books);

        Assertions.assertEquals(withOwnerBookDtoListTemplate, bookService.findAll());

        Mockito.verify(bookRepository, Mockito.times(1)).findAll();
        Mockito.verify(bookMapper, Mockito.times(1)).mapWithOwnerBookDtoList(books);

    }

    @Test
    void save() {

        Book book = getTestBook();
        WithOwnerBookDto withOwnerBookDto = getTestWithOwnerBookDto();

        Mockito.doReturn(book).when(bookMapper).toBook(withOwnerBookDto);
        Mockito.doReturn(withOwnerBookDto).when(bookMapper).toWithOwnerBookDto(book);
        Mockito.doReturn(book).when(bookRepository).save(book);

        Assertions.assertEquals(withOwnerBookDto, bookService.save(withOwnerBookDto));

        Mockito.verify(bookRepository, Mockito.times(1)).save(book);
        Mockito.verify(bookMapper, Mockito.times(1)).toWithOwnerBookDto(book);
        Mockito.verify(bookMapper, Mockito.times(1)).toBook(withOwnerBookDto);

    }

    @Test
    void update() {

        BookDto bookDto = getTestBookDto();
        Book book = getTestBook();
        FullBookDto fullBookDto = getTestFullBookDto();

        Mockito.doReturn(book).when(bookRepository).save(book);
        Mockito.doReturn(Optional.of(book)).when(bookRepository).findById(1);
        Mockito.doReturn(book).when(bookMapper).toBook(bookDto);
        Mockito.doReturn((long) 1).when(securityUserDetailsService).getCurrentUserId();
        Mockito.doReturn(fullBookDto).when(bookMapper).toFullBookDto(book);

        Assertions.assertEquals(fullBookDto, bookService.update(bookDto));

        Mockito.verify(bookMapper, Mockito.times(1)).toBook(bookDto);
        Mockito.verify(bookMapper, Mockito.times(1)).toFullBookDto(book);
        Mockito.verify(bookRepository, Mockito.times(1)).save(book);
        Mockito.verify(securityUserDetailsService, Mockito.times(1)).getCurrentUserId();

    }

    @Test
    void findByIdFullVersion() {

        FullBookDto fullBookDto = getTestFullBookDto();
        Book book = getTestBook();
        long bookId = 1;

        Mockito.doReturn(bookId).when(securityUserDetailsService).getCurrentUserId();
        Mockito.doReturn(Optional.of(book)).when(bookRepository).findById(bookId);
        Mockito.doReturn(fullBookDto).when(bookMapper).toFullBookDto(book);
        Mockito.doReturn(true).when(bookingService).getBookingInfo(bookId);

        Assertions.assertEquals(fullBookDto, bookService.findByIdFullVersion(bookId));

        Mockito.verify(bookMapper, Mockito.times(1)).toFullBookDto(book);
        Mockito.verify(securityUserDetailsService, Mockito.times(1)).getCurrentUserId();
        Mockito.verify(bookingService, Mockito.times(1)).getBookingInfo(bookId);
        Mockito.verify(bookRepository, Mockito.times(1)).findById(bookId);

    }

    @Test
    void findByIdFullVersionWithException() {

        long id = 2;
        String exceptionMessage = "Try to find book by id ";

        Mockito.doThrow(new NotFoundException(exceptionMessage + id)).when(bookRepository).findById(id);

        NotFoundException exception = Assertions.assertThrowsExactly(NotFoundException.class, () -> bookService.findByIdFullVersion(id));
        Assertions.assertEquals(exceptionMessage + id, exception.getMessage());

    }

    @Test
    void findOwnersBook() {

        long userId = 1;
        List<Book> books = getTestBookList();
        List<WithOwnerBookDto> withOwnerBookDtos = getTestWithOwnerBookDtoList();

        Mockito.doReturn(userId).when(securityUserDetailsService).getCurrentUserId();
        Mockito.doReturn(books).when(bookRepository).findAllByOwnerId(userId);
        Mockito.doReturn(withOwnerBookDtos).when(bookMapper).mapWithOwnerBookDtoList(books);

        Assertions.assertEquals(withOwnerBookDtos, bookService.findOwnersBook());

        Mockito.verify(bookMapper, Mockito.times(1)).mapWithOwnerBookDtoList(books);
        Mockito.verify(bookRepository, Mockito.times(1)).findAllByOwnerId(userId);
        Mockito.verify(securityUserDetailsService, Mockito.times(1)).getCurrentUserId();

    }

    @Test
    void successRemove() {

        long bookId = 1;
        Book book = getTestBook();

        Mockito.doReturn(Optional.of(book)).when(bookRepository).findById(bookId);
        Mockito.doNothing().when(bookRepository).deleteById(Mockito.isA(Long.class));

        bookService.remove(bookId);

        Mockito.verify(bookRepository, Mockito.times(1)).deleteById(bookId);
        Mockito.verify(bookRepository, Mockito.times(1)).findById(bookId);

    }

    @Test
    void removeException() {

        long bookId = 1;
        Book book = getTestBook();
        book.setStatus(StatusConstant.IN_USE_BOOK_STATUS);
        String exceptionMessage = "You can't delete book with status IN USE.";

        Mockito.doReturn(Optional.of(book)).when(bookRepository).findById(bookId);

        WrongBookStatusException exception = Assertions.assertThrowsExactly(WrongBookStatusException.class, () -> bookService.remove(bookId));
        Assertions.assertEquals(exceptionMessage, exception.getMessage());

        Mockito.verify(bookRepository, Mockito.times(1)).findById(bookId);
        Mockito.verify(bookRepository, Mockito.times(0)).deleteById(bookId);

    }

    @Test
    void attachFile() {

        long bookId = 1;
        long userId = 1;
        Book book = getTestBook();

        MockMultipartFile mockMultipartFile = new MockMultipartFile("data", "filename.txt",
                "text/plain", "some xml".getBytes());

        FileInfo fileInfo = new FileInfo();
        fileInfo.setFileData("some xml".getBytes());
        fileInfo.setName("filename");
        fileInfo.setExtension("txt");
        fileInfo.setDate(LocalDate.now());
        fileInfo.setId(1);

        Mockito.doReturn(Optional.of(book)).when(bookRepository).findById(bookId);
        Mockito.doReturn(userId).when(securityUserDetailsService).getCurrentUserId();
        Mockito.doReturn(fileInfo).when(fileInfoService).getFileInfo(Mockito.isA(MockMultipartFile.class));

        bookService.attachFile(mockMultipartFile, bookId);

        Mockito.verify(bookRepository, Mockito.times(1)).findById(bookId);
        Mockito.verify(securityUserDetailsService, Mockito.times(1)).getCurrentUserId();
        Mockito.verify(fileInfoService, Mockito.times(1)).getFileInfo(mockMultipartFile);

    }

    @Test
    void attachFileException() {

        long bookId = 1;
        long wrongUserId = 2;
        String exceptionMessage = "Current user is not owner";
        Book book = getTestBook();

        MockMultipartFile mockMultipartFile = new MockMultipartFile("data", "filename.txt",
                "text/plain", "some xml".getBytes());

        Mockito.doReturn(Optional.of(book)).when(bookRepository).findById(bookId);
        Mockito.doReturn(wrongUserId).when(securityUserDetailsService).getCurrentUserId();

        WrongCurrentUserException exception = Assertions.assertThrowsExactly(WrongCurrentUserException.class,
                () -> bookService.attachFile(mockMultipartFile, bookId));
        Assertions.assertEquals(exceptionMessage, exception.getMessage());

        Mockito.verify(bookRepository, Mockito.times(1)).findById(bookId);
        Mockito.verify(securityUserDetailsService, Mockito.times(1)).getCurrentUserId();
        Mockito.verify(fileInfoService, Mockito.times(0)).getFileInfo(mockMultipartFile);

    }


    private List<WithOwnerBookDto> getTestWithOwnerBookDtoList() {

        return List.of(getTestWithOwnerBookDto());
    }

    private WithOwnerBookDto getTestWithOwnerBookDto() {

        LanguageDto language = new LanguageDto((short) 1, "ENGLISH");
        CategoryDto category = new CategoryDto((short) 1, "PROFESSIONAL");

        UserDto user = new UserDto();
        user.setId(1);
        user.setGoogleEmail("test@gmail.com");
        user.setCorpEmail("testITechArt@test.com");
        user.setName("IVAN");
        user.setSurname("IVANOV");

        WithOwnerBookDto book = new WithOwnerBookDto();
        book.setOwner(user);
        book.setRate(2);
        book.setAuthor("Ivan Ivanov");
        book.setDescription("test description");
        book.setId(1);
        book.setLink("http//:test:8089:link)");
        book.setTitle("about test");
        book.setLanguage(language);
        book.setCategory(category);
        book.setStatus(new BookStatusDto((short) 1, "AVAILABLE"));

        return book;
    }

    private FullBookDto getTestFullBookDto() {

        LanguageDto language = new LanguageDto((short) 1, "ENGLISH");
        CategoryDto category = new CategoryDto((short) 1, "PROFESSIONAL");

        UserDto user = new UserDto();
        user.setId(1);
        user.setGoogleEmail("test@gmail.com");
        user.setCorpEmail("testITechArt@test.com");
        user.setName("IVAN");
        user.setSurname("IVANOV");

        FullBookDto book = new FullBookDto();
        book.setRate(2);
        book.setAuthor("Ivan Ivanov");
        book.setDescription("test description");
        book.setId(1);
        book.setLink("http//:test:8089:link)");
        book.setTitle("about test");
        book.setLanguage(language);
        book.setCategory(category);
        book.setStatus(new BookStatusDto((short) 1, "AVAILABLE"));
        book.setFileInfo(null);
        book.setReader(true);

        return book;
    }

    private BookDto getTestBookDto() {

        LanguageDto language = new LanguageDto((short) 1, "ENGLISH");
        CategoryDto category = new CategoryDto((short) 1, "PROFESSIONAL");

        UserDto user = new UserDto();
        user.setId(1);
        user.setGoogleEmail("test@gmail.com");
        user.setCorpEmail("testITechArt@test.com");
        user.setName("IVAN");
        user.setSurname("IVANOV");

        BookDto book = new BookDto();
        book.setRate(2);
        book.setAuthor("Ivan Ivanov");
        book.setDescription("test description");
        book.setId(1);
        book.setLink("http//:test:8089:link)");
        book.setTitle("about test");
        book.setLanguage(language);
        book.setCategory(category);
        book.setStatus(new BookStatusDto((short) 1, "AVAILABLE"));

        return book;
    }


    private List<Book> getTestBookList() {

        return List.of(getTestBook());
    }

    private Book getTestBook() {

        Language language = new Language((short) 1, "ENGLISH");
        Category category = new Category((short) 1, "PROFESSIONAL");

        Book book = new Book();
        book.setOwner(getTestUser());
        book.setFileInfo(null);
        book.setRate(2);
        book.setCreateDate(LocalDate.of(2022, 02, 27));
        book.setAuthor("Ivan Ivanov");
        book.setDescription("test description");
        book.setId(1);
        book.setLink("http//:test:8089:link)");
        book.setTitle("about test");
        book.setBookings(List.of());
        book.setLanguage(language);
        book.setCategory(category);
        book.setStatus(StatusConstant.AVAILABLE_BOOK_STATUS);

        return book;
    }

    private User getTestUser() {

        ConfirmationData confirmationData = new ConfirmationData();
        confirmationData.setId(1);
        confirmationData.setActivated(true);
        confirmationData.setRequestDate(LocalDate.of(2022, 02, 27));

        User user = new User();
        user.setId(1);
        user.setFileInfo(null);
        user.setGoogleEmail("test@gmail.com");
        user.setActive(true);
        user.setCorpEmail("testITechArt@test.com");
        user.setName("IVAN");
        user.setSurname("IVANOV");
        user.setConfirmationData(confirmationData);

        return user;
    }
}