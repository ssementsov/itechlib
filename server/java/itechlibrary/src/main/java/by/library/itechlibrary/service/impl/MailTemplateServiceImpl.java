package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.repository.TemplateRepository;
import by.library.itechlibrary.service.MailTemplateService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Data
@Slf4j
@RequiredArgsConstructor
@Service
public class MailTemplateServiceImpl implements MailTemplateService {

    private final TemplateRepository templateRepository;

    @Value("${template.host}")
    private String host;

    @Override
    public Template getAndFillConfirmationTemplate(User user) {

        Template template = getByName(MailTemplateConstant.MAIL_CONFIRMATION_TEMPLATE_NAME);
        String templateText = template.getText();

        templateText = getFilledTextOfTemplateFromUserInfo(user, templateText);

        template.setText(templateText);

        return template;
    }

    @Override
    public Template getAndFillTemplateFromBookingInfo(Booking booking, String templateName) {

        Template template = getByName(templateName);
        String templateText = template.getText();

        getFilledTextFromBookingInfo(booking, templateText);

        template.setText(templateText);

        return template;
    }


    private String getFilledTextOfTemplateFromUserInfo(User user, String templateText) {

        if (templateText.contains(MailTemplateConstant.USER_ID)) {

            templateText = templateText.replace(MailTemplateConstant.USER_ID, String.valueOf(user.getId()));

        }

        if (templateText.contains(MailTemplateConstant.HOST)) {

            templateText = templateText.replace(MailTemplateConstant.HOST, host);

        }

        if (templateText.contains(MailTemplateConstant.CONFIRMATION_CODE)) {

            templateText = templateText.replace(MailTemplateConstant.CONFIRMATION_CODE, user.getConfirmationData().getCode().toString());

        }

        return templateText;
    }

    private String getFilledTextFromBookingInfo(Booking booking, String templateText) {

        if (templateText.contains(MailTemplateConstant.BOOK_TITLE)) {

            templateText = templateText.replace(MailTemplateConstant.BOOK_TITLE, String.valueOf(booking.getBook().getId()));

        }

        if (templateText.contains(MailTemplateConstant.BOOK_READER_NAME)) {

            templateText = templateText.replace(MailTemplateConstant.BOOK_READER_NAME, booking.getReader().getName());

        }

        if (templateText.contains(MailTemplateConstant.BOOKING_START_DATE)) {

            templateText = templateText.replace(MailTemplateConstant.BOOKING_START_DATE, booking.getStartDate().toString());

        }

        if (templateText.contains(MailTemplateConstant.BOOKING_END_DATE)) {

            templateText = templateText.replace(MailTemplateConstant.BOOKING_END_DATE, booking.getFinishDate().toString());

        }

        if (templateText.contains(MailTemplateConstant.OWNER_NAME)) {

            templateText = templateText.replace(MailTemplateConstant.OWNER_NAME, booking.getBook().getOwner().getName());

        }

        if (templateText.contains(MailTemplateConstant.HOST)) {

            templateText = templateText.replace(MailTemplateConstant.HOST, host);

        }

        return templateText;
    }

    private Template getByName(String templateName) {

        return templateRepository.findByName(templateName)
                .orElseThrow(() -> new NotFoundException("Template has not found by name " + templateName));

    }
}
