package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.MailNotification;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.repository.MailNotificationRepository;
import by.library.itechlibrary.service.ConfirmationDataService;
import by.library.itechlibrary.service.MailNotificationService;
import by.library.itechlibrary.service.MailTemplateService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.time.LocalDateTime;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class MailNotificationServiceImpl implements MailNotificationService {

    private final JavaMailSender emailSender;

    private final MailTemplateService mailTemplateService;

    private final MailNotificationRepository mailNotificationRepository;

    private final ConfirmationDataService confirmationDataService;

    @Value("${spring.mail.username}")
    private String fromMail;


    @Async("threadPoolTaskExecutor")
    @Transactional
    @Override
    public void sent(User user, String templateName) {

        Template template = mailTemplateService.getAndFillTemplate(user, templateName);
        MailNotification notification = getMailNotification(user, template);
        mailNotificationRepository.save(notification);
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        trySetDataMimeMessage(user, notification, mimeMessage);

        emailSender.send(mimeMessage);

    }

    private void trySetDataMimeMessage(User user, MailNotification notification, MimeMessage mimeMessage) {

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        try {

            helper.setText(notification.getText(), true);
            helper.setTo(user.getGoogleEmail());
            helper.setSubject(notification.getSubject());
            helper.setFrom(notification.getFrom());

        } catch (MessagingException e) {

            e.printStackTrace();

        }
    }

    private MailNotification getMailNotification(User user, Template template) {

        MailNotification notification = new MailNotification();

        notification.setFrom(fromMail);
        notification.setTo(user.getGoogleEmail());
        notification.setSubject(template.getSubject());
        notification.setTemplate(template);
        notification.setText(template.getText());
        notification.setUser(user);
        notification.setDate(LocalDateTime.now());

        return notification;
    }
}
