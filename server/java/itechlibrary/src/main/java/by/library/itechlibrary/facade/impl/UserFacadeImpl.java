package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.dto.EmailCheckerDto;
import by.library.itechlibrary.dto.user.UserProfileDto;
import by.library.itechlibrary.entity.FileInfo;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.facade.NotificationFacade;
import by.library.itechlibrary.facade.UserFacade;
import by.library.itechlibrary.service.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Service
@Data
@RequiredArgsConstructor
public class UserFacadeImpl implements UserFacade {

    private final UserService userService;

    private final MailNotificationService mailNotificationService;

    private final ConfirmationDataService confirmationDataService;

    private final FileInfoService fileInfoService;

    private final MailTemplateService mailTemplateService;

    private final NotificationFacade notifier;

    private final UserInternalNotificationService userInternalNotificationService;


    @Override
    @Transactional
    public boolean isActiveUserAndCheckEmails(EmailCheckerDto emailCheckerDto) {

        User user = userService.checkEmails(emailCheckerDto);

        if (user.getConfirmationData().isActivated()) return true;

        notifier.sentEmailNotificationAboutUser(user, MailTemplateConstant.MAIL_CONFIRMATION_TEMPLATE_NAME, false);

        return false;
    }

    @Override
    @Transactional
    public void attachPhoto(MultipartFile multipartFile) {

        FileInfo fileInfo = fileInfoService.getFileInfo(multipartFile);
        userService.attachPhoto(fileInfo);

    }

    @Override
    @Transactional
    public void removePhoto(long fileId) {

        userService.removePhoto(fileId);
        fileInfoService.removeById(fileId);

    }

    @Override
    public UserProfileDto getCurrentUserProfileDto() {

        UserProfileDto userProfileDto = userService.getCurrentUserProfileDto();
        boolean isUnReadInternalNotification = userInternalNotificationService.isUnread(userProfileDto.getId());
        userProfileDto.setUnreadInternalNotification(isUnReadInternalNotification);

        return userProfileDto;
    }
}
