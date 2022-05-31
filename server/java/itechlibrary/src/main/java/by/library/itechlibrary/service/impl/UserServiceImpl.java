package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.MailConfirmationConstant;
import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.constant.ValidationPatternConstant;
import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.UserDto;
import by.library.itechlibrary.dto.UserProfileDto;
import by.library.itechlibrary.entity.FileInfo;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.*;
import by.library.itechlibrary.mapper.UserMapper;
import by.library.itechlibrary.pojo.SecurityUserDetails;
import by.library.itechlibrary.repository.UserRepository;
import by.library.itechlibrary.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final MailNotificationService mailNotificationService;

    private final ConfirmationDataService confirmationDataService;

    private final FileInfoService fileInfoService;

    private final MailTemplateService mailTemplateService;


    @Override
    @Transactional
    public String checkEmails(EmailCheckerDto emailCheckerDto) {

        log.info("Try to check corp email.");

        User user = getUserByCorporateEmail(emailCheckerDto.getCorpEmail());
        String googleEmail = emailCheckerDto.getGoogleEmail();

        log.info("Try to check and set google email.");

        return checkAndSetGoogleEmail(user, googleEmail);

    }

    @Override
    public List<UserDto> getConfirmedUsers() {

        log.info("Try to find users where google email is exist.");

        List<User> users = userRepository.findAllByGoogleEmailNotNull();

        return userMapper.mapUserDtoList(users);
    }

    @Override
    public User getUserByCorporateEmail(String email) {

        return findUserByCorpEmail(email);
    }

    @Transactional
    @Override
    public void confirmedGoogleEmail(long userId, UUID code) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("The user was not found by id = " + userId));

        if (user.getConfirmationData().getCode().toString().equals(code.toString())) {

            user.getConfirmationData().setActivated(true);

        } else {

            throw new WrongConfirmationCodeException("Confirmation code = " + code.toString() +
                    " has been wrong.");

        }
    }

    @Override
    public User getUserById(long id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("The user was not found."));
    }

    @Override
    public UserProfileDto getCurrentUserProfileDto() {

        User user = getCurrentUser();

        return userMapper.mapToUserProfileDto(user);
    }

    @Transactional
    @Override
    public void attachPhoto(MultipartFile multipartFile) {

        log.info("Try to attach new photo to current user");

        User user = getCurrentUser();
        FileInfo fileInfo = fileInfoService.getFileInfo(multipartFile);
        user.setFileInfo(fileInfo);

    }

    @Override
    public void removePhoto(long fileId) {

        log.info("Try to remove photo to current user");

        User currentUser = getCurrentUser();

        checkIsCurrentUsersPhoto(fileId, currentUser.getFileInfo().getId());
        currentUser.setFileInfo(null);

        userRepository.save(currentUser);
        fileInfoService.removeById(fileId);

    }

    private User getCurrentUser() {

        SecurityUserDetails securityUserDetails = (SecurityUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return findUserByCorpEmail(securityUserDetails.getCorpEmail());
    }

    private void checkIsCurrentUsersPhoto(long userPhotoId, long currentUserPhotoId) {

        if (userPhotoId != currentUserPhotoId) {

            throw new WrongUserPhotoIdException("wrong photo id for current user.");

        }
    }

    private User findUserByCorpEmail(String corpEmail) {

        validateCorpEmail(corpEmail);

        return userRepository.findByCorpEmail(corpEmail)
                .orElseThrow(() -> new NotFoundException("The corporate email was not found."));
    }

    private void validateCorpEmail(String email) {

        Matcher matcher = ValidationPatternConstant.VALID_EMAIL_ADDRESS_REGEX.matcher(email);

        if (!matcher.find()) {

            throw new WrongCorpEmailFormatException("Wrong format of corp email = " + email);

        }
    }

    private String checkAndSetGoogleEmail(User user, String googleEmail) {

        if (user.getGoogleEmail() == null || (user.getConfirmationData() != null && !user.getConfirmationData().isActivated())) {

            checkAndDeleteOldConfirmationData(user);
            user.setConfirmationData(confirmationDataService.create());
            user.setGoogleEmail(googleEmail);
            Template template = mailTemplateService.getAndFillConfirmationTemplateFromUser(user, MailTemplateConstant.MAIL_CONFIRMATION_TEMPLATE_NAME);
            mailNotificationService.sent(user, template);

            return MailConfirmationConstant.CONFIRMATION_MAIL_WAS_SENT;

        } else if (!user.getGoogleEmail().equals(googleEmail)) {

            throw new WrongGoogleEmailException("This User already has a different google address.");

        } else return MailConfirmationConstant.CONFIRMATION_MAIL_WAS_NOT_SENT;
    }

    private void checkAndDeleteOldConfirmationData(User user) {

        if (user.getConfirmationData() != null && !user.getConfirmationData().isActivated()) {

            long confirmDataId = user.getConfirmationData().getId();
            user.setConfirmationData(null);
            confirmationDataService.deleteById(confirmDataId);

        }
    }
}
