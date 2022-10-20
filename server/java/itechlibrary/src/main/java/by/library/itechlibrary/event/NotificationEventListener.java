package by.library.itechlibrary.event;

import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationCreateDto;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.internal_notification.InternalNotificationTemplate;
import by.library.itechlibrary.pojo.MailNotificationInfo;
import by.library.itechlibrary.service.InternalNotificationTemplateService;
import by.library.itechlibrary.service.MailNotificationService;
import by.library.itechlibrary.service.MailTemplateService;
import by.library.itechlibrary.service.UserInternalNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final MailNotificationService mailNotificationService;
    private final MailTemplateService mailTemplateService;
    private final InternalNotificationTemplateService internalNotificationTemplateService;
    private final UserInternalNotificationService userInternalNotificationService;

    @EventListener
    public void sentEmailNotificationAboutBooking(EmailNotificationBookingEvent event){

        Template template = mailTemplateService.getByName(event.getTemplateName());
        String filedTemplateText = mailTemplateService.getAndFillTemplateFromBookingInfo(event.getBooking(), template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(event.getTargetUser(), template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, event.isCorporateEmail());
    }

    @EventListener
    public void sentInternalNotificationAboutBooking(InternalNotificationBookingEvent event) {

        Booking booking = event.getBooking();

        InternalNotificationTemplate template = internalNotificationTemplateService.getByName(event.getTemplateName());
        String filedTemplateText = internalNotificationTemplateService.fillTemplateTextFromBooking(booking, template.getText());
        String filedTemplateLink = internalNotificationTemplateService.fillTemplateLinkFromBooking(booking, template.getLink());

        UserInternalNotificationCreateDto internalNotificationDto = UserInternalNotificationCreateDto.builder()
                .userId(event.getTargetUserId())
                .text(filedTemplateText)
                .link(filedTemplateLink)
                .templateId(template.getId())
                .build();

        userInternalNotificationService.sent(internalNotificationDto);
    }

}