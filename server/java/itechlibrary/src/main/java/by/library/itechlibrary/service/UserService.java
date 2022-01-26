package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.UserDto;
import by.library.itechlibrary.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

public interface UserService {

    String checkEmails(EmailCheckerDto emailCheckerDto);

    User getUserByCorporateEmail(String email);

    List<UserDto> getConfirmedUsers();

    void confirmedGoogleEmail(long userId, UUID code);

    User getCurrentUser();

    void attachPhoto(MultipartFile multipartFile);

    void removePhoto(long fileId);


}
