package by.library.itechlibrary.facade;

import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.user.UserProfileDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserFacade {

    boolean isActiveUserAndCheckEmails(EmailCheckerDto emailCheckerDto);

    void attachPhoto(MultipartFile multipartFile);

    void removePhoto(long fileId);

    UserProfileDto getCurrentUserProfileDto();

}
