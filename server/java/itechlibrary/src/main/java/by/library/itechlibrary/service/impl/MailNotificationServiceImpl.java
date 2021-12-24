package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.MailNotification;
import by.library.itechlibrary.service.MailNotificationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class MailNotificationServiceImpl implements MailNotificationService {

    private final JavaMailSender emailSender;


    @Override
    public void sent(MailNotification mailNotification) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailNotification.getFrom());
        message.setTo(mailNotification.getTo());
        message.setSubject(mailNotification.getSubject());
        message.setText(mailNotification.getText());
        emailSender.send(message);

    }
}
