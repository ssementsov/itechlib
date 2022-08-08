package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.user.UserDto;
import by.library.itechlibrary.dto.user.UserPlainDto;
import by.library.itechlibrary.dto.user.UserProfileDto;
import by.library.itechlibrary.entity.FileInfo;
import by.library.itechlibrary.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {

    User checkEmails(EmailCheckerDto emailCheckerDto);

    User getUserByCorporateEmail(String email);

    List<UserDto> getConfirmedUsers();

    void confirmedGoogleEmail(long userId, UUID code);

    User getUserById(long id);

    void attachPhoto(FileInfo fileInfo);

    void removePhoto(long fileId);

    UserProfileDto getCurrentUserProfileDto();

    List<UserPlainDto> getAllActiveUserPlainDto();

}
