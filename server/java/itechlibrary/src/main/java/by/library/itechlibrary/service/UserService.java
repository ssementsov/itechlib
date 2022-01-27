package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.UserDto;
import by.library.itechlibrary.dto.UserProfileDto;
import by.library.itechlibrary.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface UserService {

    String checkEmails(EmailCheckerDto emailCheckerDto);

    User getUserByCorporateEmail(String email);

    List<UserDto> getConfirmedUsers();

    void confirmedGoogleEmail(long userId, UUID code);

    User getUserById(long id);

    void attachPhoto(MultipartFile multipartFile);

    void removePhoto(long fileId);

    UserProfileDto getCurrentUserProfileDto();

}
