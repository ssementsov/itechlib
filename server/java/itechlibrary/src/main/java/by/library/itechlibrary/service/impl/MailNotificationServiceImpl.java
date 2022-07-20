package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.MailNotification;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.pojo.MailNotificationInfo;
import by.library.itechlibrary.repository.MailNotificationRepository;
import by.library.itechlibrary.service.MailNotificationService;
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

    private final MailNotificationRepository mailNotificationRepository;

    @Value("${spring.mail.username}")
    private String fromMail;


    @Async("threadPoolTaskExecutor")
    @Transactional
    @Override
    public void sent(MailNotificationInfo mailNotificationInfo) {

        MailNotification notification = getMailNotification(mailNotificationInfo);
        mailNotificationRepository.save(notification);
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        trySetDataMimeMessage(mailNotificationInfo.getUser().getGoogleEmail(), notification, mimeMessage);
        emailSender.send(mimeMessage);

    }

    private void trySetDataMimeMessage(String googleEmail, MailNotification notification, MimeMessage mimeMessage) {

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        try {

            helper.setText(notification.getText(), true);
            helper.setTo(googleEmail);
            helper.setSubject(notification.getSubject());
            helper.setFrom(notification.getFrom());

        } catch (MessagingException e) {

            e.printStackTrace();

        }
    }

    private MailNotification getMailNotification(MailNotificationInfo mailNotificationInfo) {

        MailNotification notification = new MailNotification();

        notification.setFrom(fromMail);
        notification.setTo(mailNotificationInfo.getUser().getGoogleEmail());
        notification.setSubject(mailNotificationInfo.getTemplate().getSubject());
        notification.setTemplate(mailNotificationInfo.getTemplate());
        notification.setText(mailNotificationInfo.getFiledTemplateText());
        notification.setUser(mailNotificationInfo.getUser());
        notification.setDate(LocalDateTime.now());

        return notification;
    }
}
