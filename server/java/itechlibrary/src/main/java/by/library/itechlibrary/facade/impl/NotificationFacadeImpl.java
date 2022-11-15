package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.dto.internal_notification.BookingInternalNotificationDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationCreateDto;
import by.library.itechlibrary.dto.internal_notification.UserInternalNotificationDto;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.internal_notification.BookingInternalNotificationId;
import by.library.itechlibrary.entity.internal_notification.InternalNotificationTemplate;
import by.library.itechlibrary.exeption_handler.exception.WrongBookingStatusException;
import by.library.itechlibrary.facade.NotificationFacade;
import by.library.itechlibrary.pojo.MailNotificationInfo;
import by.library.itechlibrary.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static by.library.itechlibrary.constant.BookingStatusConstant.emailTemplateBookingStatusMap;
import static by.library.itechlibrary.constant.BookingStatusConstant.internalTemplateBookingStatusMap;

@Component
@RequiredArgsConstructor
public class NotificationFacadeImpl implements NotificationFacade {

    private final MailNotificationService mailNotificationService;
    private final MailTemplateService mailTemplateService;
    private final InternalNotificationTemplateService internalNotificationTemplateService;
    private final UserInternalNotificationService userInternalNotificationService;
    private final BookingInternalNotificationService bookingInternalNotificationService;

    @Transactional
    @Override
    public void sentEmailNotificationAboutBooking(Booking booking, User targetUser, String templateName, boolean isCorporateEmail) {

        Template template = mailTemplateService.getByName(templateName);
        String filedTemplateText = mailTemplateService.getAndFillTemplateFromBookingInfo(booking, template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(targetUser, template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, isCorporateEmail);
    }

    @Transactional
    @Override
    public void sentEmailNotificationAboutUser(User targetUser, String templateName, boolean isCorporateEmail) {

        Template template = mailTemplateService.getByName(templateName);
        String filedTemplateText = mailTemplateService.getAndFillConfirmationTemplateFromUser(targetUser, template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(targetUser, template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, isCorporateEmail);
    }

    @Transactional
    @Override
    public void sentInternalNotificationAboutBooking(Booking booking, long targetUserId, String templateName) {

        InternalNotificationTemplate template = internalNotificationTemplateService.getByName(templateName);
        String filedTemplateText = internalNotificationTemplateService.fillTemplateTextFromBooking(booking, template.getText());
        String filedTemplateLink = internalNotificationTemplateService.fillTemplateLinkFromBooking(booking, template.getLink());

        UserInternalNotificationCreateDto internalNotificationCreateDto = UserInternalNotificationCreateDto.builder()
                .userId(targetUserId)
                .text(filedTemplateText)
                .link(filedTemplateLink)
                .templateId(template.getId())
                .build();

        UserInternalNotificationDto internalNotificationDto = userInternalNotificationService.save(internalNotificationCreateDto);

        BookingInternalNotificationDto bookingInternalNotificationDto = BookingInternalNotificationDto.builder()
                .bookingId(booking.getId())
                .userId(targetUserId)
                .templateId(template.getId())
                .notificationId(internalNotificationDto.getId())
                .build();

        userInternalNotificationService.saveBookingInternalNotification(bookingInternalNotificationDto);
        userInternalNotificationService.notifyUserAboutNotifications(targetUserId, true);

    }

    @Transactional
    @Override
    public void markInternalNotificationAsRead(long userId, long bookingId, String templateName) {

        long templateId = internalNotificationTemplateService.getByName(templateName).getId();
        BookingInternalNotificationId bookingInternalNotificationId = BookingInternalNotificationId.of(bookingId, userId, templateId);
        long notificationId = bookingInternalNotificationService.getNotificationId(bookingInternalNotificationId);
        userInternalNotificationService.markIsRead(notificationId);

        boolean existUnreadNotifications = userInternalNotificationService.isUnread(userId);
        userInternalNotificationService.notifyUserAboutNotifications(userId, existUnreadNotifications);
    }


    @Override
    public String chooseEmailTemplateName(String bookingStatusName) {

        Optional<String> optionalTemplateName = Optional.ofNullable(emailTemplateBookingStatusMap.get(bookingStatusName));

        return optionalTemplateName.orElseThrow(
                () -> new WrongBookingStatusException("Incorrect booking status for sending an email about resolving assigned booking.")
        );
    }

    @Override
    public String chooseInternalTemplateName(String bookingStatusName) {

        Optional<String> optionalTemplateName = Optional.ofNullable(internalTemplateBookingStatusMap.get(bookingStatusName));

        return optionalTemplateName.orElseThrow(
                () -> new WrongBookingStatusException("Incorrect booking status for sending an internal notification about resolving assigned booking.")
        );

    }

}