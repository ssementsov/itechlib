package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.MailNotification;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.repository.TemplateRepository;
import by.library.itechlibrary.service.MailNotificationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.SpringProperties;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class MailNotificationServiceImpl implements MailNotificationService {

    private final JavaMailSender emailSender;
    private final TemplateRepository templateRepository;

    @Value("${spring.mail.username}")
    private String fromMail;


    @SneakyThrows
    @Override
    public void sent(User user, String templateName) {

        Template template = templateRepository.findByName(templateName)
                .orElseThrow(() -> new NotFoundException("Template has not found by name " + templateName));

        MailNotification notification = new MailNotification();
        notification.set

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setText(, true);
        helper.setTo(user.getGoogleEmail());
        helper.setSubject("This is the test message for testing gmail smtp server using spring mail");
        helper.setFrom(fromMail);
        emailSender.send(mimeMessage);

    }
}
