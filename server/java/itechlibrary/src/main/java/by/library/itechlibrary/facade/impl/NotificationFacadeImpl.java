package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationCreateDto;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.internal_notification.InternalNotificationTemplate;
import by.library.itechlibrary.facade.NotificationFacade;
import by.library.itechlibrary.pojo.MailNotificationInfo;
import by.library.itechlibrary.service.InternalNotificationTemplateService;
import by.library.itechlibrary.service.MailNotificationService;
import by.library.itechlibrary.service.MailTemplateService;
import by.library.itechlibrary.service.UserInternalNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationFacadeImpl implements NotificationFacade {

    private final MailNotificationService mailNotificationService;
    private final MailTemplateService mailTemplateService;
    private final InternalNotificationTemplateService internalNotificationTemplateService;
    private final UserInternalNotificationService userInternalNotificationService;

    @Override
    public void sentEmailNotificationAboutBooking(Booking booking, User targetUser, String templateName, boolean isCorporateEmail) {

        Template template = mailTemplateService.getByName(templateName);
        String filedTemplateText = mailTemplateService.getAndFillTemplateFromBookingInfo(booking, template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(targetUser, template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, isCorporateEmail);
    }

    @Override
    public void sentEmailNotificationAboutUser(User targetUser, String templateName, boolean isCorporateEmail) {

        Template template = mailTemplateService.getByName(templateName);
        String filedTemplateText = mailTemplateService.getAndFillConfirmationTemplateFromUser(targetUser, template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(targetUser, template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, isCorporateEmail);
    }

    @Override
    public void sentInternalNotificationAboutBooking(Booking booking, long targetUserId, String templateName) {

        InternalNotificationTemplate template = internalNotificationTemplateService.getByName(templateName);
        String filedTemplateText = internalNotificationTemplateService.fillTemplateTextFromBooking(booking, template.getText());
        String filedTemplateLink = internalNotificationTemplateService.fillTemplateLinkFromBooking(booking, template.getLink());

        UserInternalNotificationCreateDto internalNotificationDto = UserInternalNotificationCreateDto.builder()
                .userId(targetUserId)
                .text(filedTemplateText)
                .link(filedTemplateLink)
                .templateId(template.getId())
                .build();

        userInternalNotificationService.sent(internalNotificationDto);
    }

}